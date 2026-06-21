/*
    Create UI models from full models
    https://github.com/evoluteur/evolutility-models
    (c) 2026 Olivier Giulieri
*/
import * as helpers from "./helpers.ts";
import { uiModel } from "./models-mapping.ts";
import * as models from "../models/all_models.js";
import type { Model } from "./types.ts";

helpers.makeDirectory("dist");
helpers.makeDirectory("dist/ui");
let dir = "dist/ui/models";
const allModels: { mid: string; path: string | null | undefined }[] = [];
const worlds: Record<string, boolean> = {};

helpers.logTask("UI", models as Record<string, unknown>);
helpers.clearDirectory(dir);

dir = dir + "/";
for (const mid in models) {
  const m = (models as Record<string, Model>)[mid];
  const newm = uiModel(m);
  let filename = `${dir}${m.id}.js`;

  if (m.world) {
    if (!worlds[m.world]) {
      helpers.makeDirectory(dir + m.world);
      worlds[m.world] = true;
    }
    filename = `${dir}${m.world}/${m.id}.js`;
  }
  allModels.push({ mid: m.id, path: m.world });
  helpers.writeFile(filename, helpers.txtExportModel("UI", newm as Model));
}

if (!dir.startsWith("../")) {
  const txt =
    helpers.headComment("UI") +
    allModels
      .map(
        (m) => `import ${m.mid} from './${m.path ? m.path + "/" : ""}${m.mid}'`,
      )
      .join("\n") +
    "\n\nconst uiModels = {\n" +
    allModels.map((m) => `    ${m.mid},`).join("\n") +
    "\n};\n\nexport default uiModels;";

  helpers.writeFile(dir + "all_models.js", txt);
}
