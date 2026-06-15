/*
    Create UI models from full models
    https://github.com/evoluteur/evolutility-models
    (c) 2026 Olivier Giulieri
*/
const helpers = require("./helpers.js");
const mfn = require("./models-mapping.js");
const models = require("../models/all_models.js");

helpers.makeDirectory("dist");
helpers.makeDirectory("dist/ui");
let dir = "dist/ui/models";
let allModels = [];
let worlds = {};

helpers.logTask("UI", models);
helpers.clearDirectory(dir);

// - Generate UI models
dir = dir + "/";
for (let mid in models) {
  const m = models[mid];
  const newm = mfn.uiModel(m);
  let filename = `${dir}${m.id}.js`;

  if (m.world) {
    if (!worlds[m.world]) {
      const nDir = dir + "/" + m.world;
      helpers.makeDirectory(nDir);
      worlds[m.world] = true;
    }
    filename = `${dir}${m.world}/${m.id}.js`;
  }
  allModels.push({ mid: m.id, path: m.world });
  helpers.writeFile(filename, helpers.txtExportModel("UI", newm));
}

// - Generate "all_models.js" with list of models
if (!dir.startsWith("../")) {
  const txt =
    helpers.headComment("UI") +
    "import {prepModel} from '../utils/dico'\n\n" +
    allModels
      .map(
        (m) => `import ${m.mid} from './${m.path ? m.path + "/" : ""}${m.mid}'`
      )
      .join("\n") +
    "\n\nconst uiModels = {\n" +
    allModels.map((m) => `    ${m.mid}: prepModel(${m.mid}),`).join("\n") +
    "\n};\n\nexport default uiModels;";

  helpers.writeFile(dir + "all_models.js", txt);
}
