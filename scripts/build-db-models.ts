/*!
 *  SQL scripts to store the models in the database (as JSON):
 *  - 003_create_models: tables "evol_model" and "evol_model_history"
 *  - 004_seed_models: one row per model in "evol_model" (full model w/ UI
 *    and DB props), and its version in "evol_model_history".
 *
 *  The seed script can be run again after changing models: models that
 *  changed get a new version (the previous one stays in the history),
 *  models not in the script are left alone.
 *
 *  https://github.com/evoluteur/evolutility-models
 *  (c) 2026 Olivier Giulieri
 */

import fs from "fs";
// - models from files, not prepared (model-manager.ts would change them)
import * as modelsNS from "../models/all_models.ts";
import { storedModel } from "./models-mapping.ts";
import { makeDirectoryPath } from "./utils.ts";
import { config } from "../config.ts";
import pkg from "../package.json" with { type: "json" };
import type { Model } from "./types.ts";

const { version, homepage } = pkg;
const schemaDot = config.schema ? `"${config.schema}".` : "";
const T = `${schemaDot}evol_model`;
const H = `${schemaDot}evol_model_history`;
const noTZ = " without time zone";
const now = "timezone('utc', now())";

const sqlString = (v: string) => "'" + v.replace(/'/g, "''") + "'";

export const sqlCreateModelTables = (): string => `
CREATE TABLE IF NOT EXISTS ${T} (
 id text PRIMARY KEY,
 model jsonb NOT NULL,
 version integer NOT NULL DEFAULT 1,
 created_at timestamp${noTZ} DEFAULT ${now},
 updated_at timestamp${noTZ} DEFAULT ${now}
);
COMMENT ON TABLE ${T} IS 'Models (one JSON document per model)';

CREATE TABLE IF NOT EXISTS ${H} (
 id serial PRIMARY KEY,
 model_id text NOT NULL,
 version integer NOT NULL,
 model jsonb NOT NULL,
 saved_at timestamp${noTZ} DEFAULT ${now},
 UNIQUE (model_id, version)
);
COMMENT ON TABLE ${H} IS 'Every saved version of the models';
`;

export const sqlSeedModels = (models: Model[]): string => {
  const inserts = models
    .map(
      (m) => `INSERT INTO ${T}(id, model) VALUES (${sqlString(m.id)}, ${sqlString(JSON.stringify(m))}::jsonb)
ON CONFLICT (id) DO UPDATE SET model = EXCLUDED.model, version = ${T}.version + 1, updated_at = ${now}
WHERE ${T}.model IS DISTINCT FROM EXCLUDED.model;
`,
    )
    .join("\n");
  const ids = models.map((m) => sqlString(m.id)).join(", ");
  return `
BEGIN;

${inserts}
-- - keep the current version of each model in the history
INSERT INTO ${H}(model_id, version, model)
SELECT id, version, model FROM ${T} WHERE id IN (${ids})
ON CONFLICT (model_id, version) DO NOTHING;

COMMIT;
`;
};

const header = (action: string, d: Date) => `/*
  SQL Script to ${action} on PostgreSQL.
  Generated on ${d.toLocaleString().replace(", ", " at ")}.
  Powered by evolutility-models v${version} - ${homepage}
*/\n`;

const createModelsSQL = (): void => {
  const all = modelsNS as unknown as Record<string, Model>;
  const models = Object.values(all).map((m) => storedModel(m, all));
  const d = new Date();
  const fId = d.toISOString().replace(/:/g, "");
  const dir = "dist/db/sql/";
  makeDirectoryPath(dir);
  fs.writeFileSync(
    `${dir}003_create_models_${fId}.sql`,
    header("create the tables for models", d) + sqlCreateModelTables(),
  );
  fs.writeFileSync(
    `${dir}004_seed_models_${fId}.sql`,
    header(`store ${models.length} models`, d) + sqlSeedModels(models),
  );
  console.log(
    `${models.length} models: ${models.map((m) => m.id).join(", ")}.\nSQL saved in ${dir}003_create_models_${fId}.sql and 004_seed_models_${fId}.sql.`,
  );
};

createModelsSQL();
