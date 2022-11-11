/*!
    Evolutility-Models

    Helper functions mostly for writing to files and console.

    https://github.com/evoluteur/evolutility-models
    (c) 2022 Olivier Giulieri
*/

const path = require("path");
const fs = require("fs");
const prettier = require("prettier");
const pkg = require("../package.json");
const github = {
  model: "https://github.com/evoluteur/evolutility-models",
  UI: "https://github.com/evoluteur/evolutility-ui-react",
  DB: "https://github.com/evoluteur/evolutility-server-node",
};

const fnError = (err) => {
  if (err) {
    throw err;
  }
};
const removeDirectory = (nDir) => {
  // - https://stackoverflow.com/a/42505874/3027390
  if (fs.existsSync(nDir)) {
    fs.readdirSync(nDir).forEach(function (entry) {
      var entry_path = path.join(nDir, entry);
      if (fs.lstatSync(entry_path).isDirectory()) {
        removeDirectory(entry_path);
      } else {
        fs.unlinkSync(entry_path);
      }
    });
    fs.rmdirSync(nDir);
  }
};
const clearDirectory = (nDir) => {
  removeDirectory(nDir);
  fs.mkdirSync(nDir);
};
const writeFile = (filename, txt, noPrettier) => {
  const formattedTxt = noPrettier
    ? txt
    : prettier.format(txt, {
        parser: "babel",
      });
  console.log(filename);
  fs.writeFile(filename, formattedTxt, fnError);
};
const makeDirectory = (nDir) => {
  if (!fs.existsSync(nDir)) {
    fs.mkdirSync(nDir);
  }
};
const logTask = (modelType, models) => {
  const nbModels = Object.keys(models).length;
  console.log(
    "Evolutility-models v." +
      pkg.version +
      " -> Generating " +
      nbModels +
      " " +
      modelType +
      " models:"
  );
};
const headComment = (modelType, m) =>
  "/*\n  " +
  headEvol(modelType) +
  headSubject(m) +
  " " +
  github[modelType] +
  "\n*/\n\n";
const headSubject = (m) =>
  (m ? " model for " + (m.label || m.title || m.id) : " Models") + "\n ";
const headEvol = (modelType) => "Evolutility " + modelType;
const txtExportModel = (modelType, model) =>
  headComment(modelType, model) +
  "module.exports = " +
  JSON.stringify(model, null, "\t");

module.exports = {
  clearDirectory: clearDirectory,
  removeDirectory: removeDirectory,
  makeDirectory: makeDirectory,
  writeFile: writeFile,
  logTask: logTask,
  headComment: headComment,
  txtExportModel: txtExportModel,
};
