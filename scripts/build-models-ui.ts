/*
 *  Create UI models from full models
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
import { uiModel } from "./models-mapping.ts";
import * as models from "../models/all_models.ts";
import type { Model } from "./types.ts";
const extension = "ts";

makeDirectoryPath("dist/ui");
let dir = "dist/ui/models";
const allModels: { mid: string; path: string | null | undefined }[] = [];
const worlds: Record<string, boolean> = {};

splash();
logTask("UI", models as Record<string, unknown>);
clearDirectory(dir);
writeTypesTs(dir);

dir = dir + "/";
for (const mid in models) {
  const m = (models as Record<string, Model>)[mid];
  const newm = uiModel(m);
  let filename = `${dir}${m.id}.${extension}`;

  if (m.world) {
    if (!worlds[m.world]) {
      makeDirectory(dir + m.world);
      worlds[m.world] = true;
    }
    filename = `${dir}${m.world}/${m.id}.${extension}`;
  }
  allModels.push({ mid: m.id, path: m.world });
  writeFile(filename, txtExportModel(newm, "ModelUI"));
}

if (!dir.startsWith("../")) {
  writeFile(
    `${dir}all_models.${extension}`,
    `${headComment("UI")}${modelsExport(allModels, extension)}\n`,
  );
}
