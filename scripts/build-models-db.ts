/*
    Create DB models from full models
    https://github.com/evoluteur/evolutility-models
    (c) 2026 Olivier Giulieri
*/
import * as helpers from "./helpers.js";
import { dbModel } from "./models-mapping.js";
import * as models from "../models/all_models.js";
import type { Model } from "./types.js";

helpers.makeDirectory("dist");
helpers.makeDirectory("dist/db");
let dir = "dist/db/models";
const allModels: { mid: string; path: string | null | undefined }[] = [];
const worlds: Record<string, boolean> = {};

helpers.logTask("DB", models as Record<string, unknown>);
helpers.clearDirectory(dir);

dir = dir + "/";
Object.keys(models).forEach((mid) => {
  const m = models[mid as keyof typeof models] as Model;
  const newm = dbModel(m);
  let filename = dir + m.id + ".js";

  if (m.world) {
    if (!worlds[m.world]) {
      helpers.makeDirectory(dir + m.world);
      worlds[m.world] = true;
    }
    filename = `${dir}${m.world}/${m.id}.js`;
  }
  allModels.push({ mid: newm.id!, path: m.world });
  helpers.writeFile(filename, helpers.txtExportModel("DB", newm as Model));
});

if (!dir.startsWith("../")) {
  const txt =
    helpers.headComment("DB") +
    allModels
      .map(
        (m) =>
          `export { ${m.mid} } from './${m.path ? m.path + "/" : ""}${m.mid}.js';`,
      )
      .join("\n") +
    "\n";

  helpers.writeFile(dir + "all_models.js", txt);
}
