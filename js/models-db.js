/*
    Create DB models from full models
    https://github.com/evoluteur/evolutility-models
    (c) 2022 Olivier Giulieri
*/
const helpers = require("./helpers.js");
const mfn = require("./models-mapping.js");
const models = require("../models/all_models.js");

helpers.makeDirectory("dist");
let dir = "dist/models-db";
//let dir = '../evolutility-server-node/models'
let allModels = [];
let worlds = {};

helpers.logTask("DB", models);
helpers.clearDirectory(dir);

// - Generate DB models
dir = dir + "/";
for (let mid in models) {
  const m = models[mid];
  const newm = mfn.dbModel(m);
  let filename = dir + m.id + ".js";

  if (m.world) {
    if (!worlds[m.world]) {
      const nDir = dir + "/" + m.world;
      helpers.makeDirectory(nDir);
      worlds[m.world] = true;
    }
    filename = dir + m.world + "/" + m.id + ".js";
  }
  allModels.push({ mid: newm.id, path: m.world });
  helpers.writeFile(filename, helpers.txtExportModel("DB", newm));
}

// - Generate "all_models.js" with list of models
if (!dir.startsWith("../")) {
  const txt =
    helpers.headComment("DB") +
    "module.exports = {\n" +
    allModels
      .map(
        (m) =>
          `    ${m.mid}: require('./${m.path ? m.path + "/" : ""}${m.mid}')`
      )
      .join(",\n") +
    "\n}";

  helpers.writeFile(dir + "all_models.js", txt);
}
