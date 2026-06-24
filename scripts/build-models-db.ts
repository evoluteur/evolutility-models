/*
 *  Create DB models from full models
 *
 *  https://github.com/evoluteur/evolutility-models
 *  (c) 2026 Olivier Giulieri
 */

import {
  logTask,
  clearDirectory,
  writeFile,
  txtExportModel,
  headComment,
  modelsExport,
  writeTypesTs,
  makeDirectory,
  makeDirectoryPath,
  splash,
} from "./utils.ts";
import { dbModel } from "./models-mapping.ts";
import * as models from "../models/all_models.ts";
import type { Model } from "./types.ts";

const isTypeScript = true;
const extension = isTypeScript ? "ts" : "js";

makeDirectoryPath("dist/db");
let dir = "dist/db/models";
const allModels: { mid: string; path: string | null | undefined }[] = [];
const worlds: Record<string, boolean> = {};

splash();
logTask("DB", models as Record<string, unknown>);
clearDirectory(dir);
writeTypesTs(dir);

dir = dir + "/";
Object.keys(models).forEach((mid) => {
  const m = models[mid as keyof typeof models] as Model;
  const newm = dbModel(m);
  let filename = `${dir}${m.id}.${extension}`;

  if (m.world) {
    if (!worlds[m.world]) {
      makeDirectory(dir + m.world);
      worlds[m.world] = true;
    }
    filename = `${dir}${m.world}/${m.id}.${extension}`;
  }
  allModels.push({ mid: newm.id!, path: m.world });
  writeFile(filename, txtExportModel(newm, "ModelDB"));
});

if (!dir.startsWith("../")) {
  writeFile(
    `${dir}all_models.${extension}`,
    `${headComment("DB")}${modelsExport(allModels, extension)}\n`,
  );
}
