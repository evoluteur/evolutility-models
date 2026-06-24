/*!
 *  Evolutility-Models
 *  Helper functions mostly for writing to files and console.
 *
 *  https://github.com/evoluteur/evolutility-models
 *  (c) 2026 Olivier Giulieri
 */

import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import type { ModelUI, ModelDB } from "./types.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
import pkg from "../package.json" with { type: "json" };
const { version } = pkg;

const github: Record<string, string> = {
  model: "https://github.com/evoluteur/evolutility-models",
  UI: "https://github.com/evoluteur/evolutility-ui-react",
  DB: "https://github.com/evoluteur/evolutility-server-node",
};

export const fnError = (err: NodeJS.ErrnoException | null): void => {
  if (err) throw err;
};

export const removeDirectory = (nDir: string): void => {
  if (fs.existsSync(nDir)) {
    fs.readdirSync(nDir).forEach((entry) => {
      const entry_path = path.join(nDir, entry);
      if (fs.lstatSync(entry_path).isDirectory()) {
        removeDirectory(entry_path);
      } else {
        fs.unlinkSync(entry_path);
      }
    });
    fs.rmdirSync(nDir);
  }
};

export const clearDirectory = (nDir: string): void => {
  removeDirectory(nDir);
  fs.mkdirSync(nDir);
};

export const makeDirectory = (nDir: string): void => {
  if (!fs.existsSync(nDir)) {
    fs.mkdirSync(nDir);
  }
};

export const makeDirectoryPath = (dir: string): void => {
  const parts = dir.split("/");
  let p = "";
  for (const part of parts) {
    p += part + "/";
    makeDirectory(p);
  }
};

export const logTask = (
  modelType: string,
  models: Record<string, unknown>,
): void => {
  const nbModels = Object.keys(models).length;
  console.log(`Generating ${nbModels} ${modelType}-models:`);
};

export const headComment = (
  modelType: string,
  m?: Pick<ModelUI | ModelDB, "title" | "id" | "fields" | "collections">,
): string => {
  const fieldsCount = m?.fields?.length ?? 0;
  const collectionsCount = m?.collections?.length ?? 0;
  const header = m
    ? `Model for ${m?.title || m?.id} (${fieldsCount} fields${collectionsCount ? `, ${collectionsCount} collections` : ""})`
    : `Models`;
  return (
    `/*\n  ${header}\n` +
    `  Generated at ${new Date().toLocaleString()}\n` +
    `  Powered by evolutility-models v.${version} - https://github.com/evoluteur/evolutility-models` +
    (github[modelType] ?? "") +
    "\n*/\n\n"
  );
};

export function modelExportWrap(
  m: ModelUI | ModelDB,
  modelType: "Model" | "ModelUI" | "ModelDB",
): string {
  const typesPath = m.world ? "../types.ts" : "./types.ts";
  return (
    `import type { ${modelType} } from "${typesPath}";\n\n` +
    `export const ${m.id} = ${JSON.stringify(m, null, "\t")} satisfies ${modelType};\n`
  );
}

export const writeTypesTs = (outDir: string): void => {
  const src = fs.readFileSync(path.join(__dirname, "types.ts"), "utf-8");
  writeFile(`${outDir}/types.ts`, src.replace("vX", `v${version}`));
};

export function modelsExport(
  allModels: { mid: string; path?: string }[],
  extension: string = "ts",
): string {
  return (
    allModels
      .map(
        (m) =>
          `export { ${m.mid} } from './${m.path ? m.path + "/" : ""}${m.mid}.${extension}';`,
      )
      .join("\n") + "\n"
  );
}

export const txtExportModel = (
  model: ModelUI | ModelDB,
  modelType: "Model" | "ModelUI" | "ModelDB",
): string => headComment(modelType, model) + modelExportWrap(model, modelType);

export const writeFile = (filename: string, txt: string): void => {
  console.log("=> " + filename);
  fs.writeFile(filename, txt, fnError);
};

const asciiArt =
  "  ___         _      _   _ _ _ _         \n" +
  " | __|_ _____| |_  _| |_(_) (_) |_ _  _  \n" +
  " | _|\\ V / _ \\ | || |  _| | | |  _| || | \n" +
  " |___|\\_/\\___/_|\\_,_|\\__|_|_|_|\\__|\\_, | \n" +
  "                                   |__/  \n ";

export const splash = () => {
  console.log(asciiArt);
};
