/*!
 *  Write the models stored in the database (table "evol_model", edited in
 *  the Designer) back into the model files ("models/").
 *
 *  Usage: npm run models:pull [-- todo contact ...] [--dry-run]
 *
 *  - Models that changed are written in their file (new models in
 *    "models/{world}/{id}.ts", and added to "models/all_models.ts").
 *  - Models only in the files are left alone.
 *  - Files are written in the stored form (what "004_seed_models" would
 *    generate from them), so the SQL generated next is the same as the
 *    database: re-running it changes nothing.
 *
 *  Database: config.connectionString (or env DATABASE_URL).
 *
 *  https://github.com/evoluteur/evolutility-models
 *  (c) 2026 Olivier Giulieri
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";
import prettier from "prettier";
import * as modelsNS from "../models/all_models.ts";
import { storedModel } from "./models-mapping.ts";
import { config } from "../config.ts";
import type { Model } from "./types.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const modelsDir = path.join(__dirname, "../models");
const indexFile = path.join(modelsDir, "all_models.ts");

type Obj = Record<string, unknown>;

// #region ----- Helpers ----------------------------------

// - same order as the Designer: main props, other single values, arrays
const firstProps = [
  "id",
  "type",
  "label",
  "title",
  "name",
  "namePlural",
  "icon",
  "world",
  "active",
];
const lastArrays = ["fields", "groups", "collections"];
const isObject = (v: unknown): v is Obj =>
  typeof v === "object" && v !== null && !Array.isArray(v);
export const sortProps = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(sortProps);
  if (!isObject(value)) return value;
  const keys = Object.keys(value);
  const nestedKey = (k: string) =>
    Array.isArray(value[k]) || isObject(value[k]);
  const first = firstProps.filter((k) => keys.includes(k) && !nestedKey(k));
  const singles = keys.filter((k) => !first.includes(k) && !nestedKey(k));
  const rank = (k: string) =>
    lastArrays.includes(k) ? lastArrays.indexOf(k) + 1 : 0;
  const nested = keys.filter(nestedKey).sort((a, b) => rank(a) - rank(b));
  const sorted: Obj = {};
  [...first, ...singles, ...nested].forEach(
    (k) => (sorted[k] = sortProps(value[k])),
  );
  return sorted;
};

// - same JSON w/ keys in any order
const canonical = (v: unknown): string =>
  JSON.stringify(v, (_k, val) =>
    isObject(val)
      ? Object.fromEntries(
          Object.keys(val)
            .sort()
            .map((k) => [k, val[k]]),
        )
      : val,
  );

// - file of each model id ("export const todo = ...")
const modelFiles = (): Record<string, string> => {
  const files: Record<string, string> = {};
  const walk = (dir: string) =>
    fs.readdirSync(dir, { withFileTypes: true }).forEach((d) => {
      const p = path.join(dir, d.name);
      if (d.isDirectory()) walk(p);
      else if (d.name.endsWith(".ts") && p !== indexFile) {
        const m = fs.readFileSync(p, "utf8").match(/export const (\w+)\s*=/);
        if (m) files[m[1]] = p;
      }
    });
  walk(modelsDir);
  return files;
};

export const modelSource = async (m: Model, version: number, file: string) => {
  const typesPath = path
    .relative(path.dirname(file), path.join(__dirname, "types.js"))
    .replace(/\\/g, "/");
  const src = `/*
  Evolutility Model for ${m.title || m.id}
  From the database (version ${version}) w/ "npm run models:pull".
*/

import type { Model } from "${typesPath.startsWith(".") ? typesPath : "./" + typesPath}";

export const ${m.id} = ${JSON.stringify(sortProps(m), null, 2)} satisfies Model;
`;
  return prettier.format(src, { parser: "typescript" });
};

// - add "export { id } from ..." to all_models.ts (after the last export)
const addToIndex = (id: string, file: string) => {
  const rel = "./" + path.relative(modelsDir, file).replace(/\\/g, "/");
  const lines = fs.readFileSync(indexFile, "utf8").split("\n");
  let last = -1;
  lines.forEach((l, i) => {
    if (/^export \{/.test(l)) last = i;
  });
  lines.splice(last + 1, 0, `export { ${id} } from "${rel}";`);
  fs.writeFileSync(indexFile, lines.join("\n"));
};
//#endregion

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const ids = args.filter((a) => !a.startsWith("--"));

  const client = new pg.Client({ connectionString: config.connectionString });
  await client.connect();
  const schema = `"${config.schema || "evolutility"}"`;
  const { rows } = await client.query<{
    id: string;
    model: Model;
    version: number;
  }>(
    `SELECT id, model, version FROM ${schema}.evol_model ${ids.length ? "WHERE id = ANY($1)" : ""} ORDER BY id`,
    ids.length ? [ids] : [],
  );
  await client.end();

  const fileModels = modelsNS as unknown as Record<string, Model>;
  const files = modelFiles();
  const counts = { updated: 0, created: 0, unchanged: 0 };

  for (const { id, model, version } of rows) {
    const fileModel = fileModels[id];
    if (
      fileModel &&
      canonical(storedModel(fileModel, fileModels)) === canonical(model)
    ) {
      counts.unchanged++;
      continue;
    }
    if (!/^[A-Za-z_$][\w$]*$/.test(id)) {
      console.warn(
        `  ! "${id}" is not a valid name for a file export, skipped.`,
      );
      continue;
    }
    const isNew = !files[id];
    const file =
      files[id] || path.join(modelsDir, model.world || "others", `${id}.ts`);
    console.log(
      `${isNew ? "+" : "~"} ${id} (version ${version}) -> ${path.relative(process.cwd(), file)}`,
    );
    if (!dryRun) {
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, await modelSource(model, version, file));
      if (isNew) addToIndex(id, file);
    }
    counts[isNew ? "created" : "updated"]++;
  }
  const onlyInFiles = Object.keys(fileModels).filter(
    (id) => !rows.some((r) => r.id === id) && (!ids.length || ids.includes(id)),
  );
  console.log(
    `${dryRun ? "[dry run] " : ""}${counts.updated} updated, ${counts.created} new, ${counts.unchanged} unchanged.` +
      (onlyInFiles.length
        ? ` Only in files (left alone): ${onlyInFiles.join(", ")}.`
        : ""),
  );
}

if (
  import.meta.url === `file://${process.argv[1]}` ||
  process.argv[1]?.endsWith("models-pull.ts")
) {
  main().catch((err) => {
    console.error("Could not pull the models:", err.message);
    process.exit(1);
  });
}
