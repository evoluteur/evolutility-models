/*!
    Evolutility-Models

    Helper functions mostly for writing to files and console.

    https://github.com/evoluteur/evolutility-models
    (c) 2026 Olivier Giulieri
*/

import path from "path";
import fs from "fs";
import prettier from "prettier";
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

const makeDirectory = (nDir) => {
  if (!fs.existsSync(nDir)) {
    fs.mkdirSync(nDir);
  }
};

const logTask = (modelType, models) => {
  const nbModels = Object.keys(models).length;
  console.log(`Generating ${nbModels} ${modelType}-models:`);
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
  "const model = " +
  JSON.stringify(model, null, "\t") +
  "\n\nexport default model;\n";

//TODO: move to shared library
const writeFile = (filename, txt, noPrettier) => {
  // const formattedTxt = noPrettier
  //   ? txt
  //   : prettier.format(txt, {
  //       parser: "babel",
  //     });
  console.log("=> " + filename);
  // fs.writeFile(filename, formattedTxt, fnError);
  fs.writeFile(filename, txt, fnError);
};

export {
  clearDirectory,
  removeDirectory,
  makeDirectory,
  writeFile,
  logTask,
  headComment,
  txtExportModel,
};
