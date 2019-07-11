/*!
    Evolutility-Models

    Helper functions mostly for writing to files and console.

    https://github.com/evoluteur/evolutility-models
    (c) 2019 Olivier Giulieri
*/

const path = require('path');
const fs = require('fs');
const pkg = require('../package.json');
const github = {
    model: 'https://github.com/evoluteur/evolutility-models',
    UI: 'https://github.com/evoluteur/evolutility-ui-react',
    DB: 'https://github.com/evoluteur/evolutility-server-node',
}
function fnError(err){
    if (err){
        throw err;
    }
}
function removeDirectory(nDir) {
    // - https://stackoverflow.com/a/42505874/3027390
    if (fs.existsSync(nDir)) {
        fs.readdirSync(nDir).forEach(function(entry) {
            var entry_path = path.join(nDir, entry);
            if (fs.lstatSync(entry_path).isDirectory()) {
                removeDirectory(entry_path);
            } else {
                fs.unlinkSync(entry_path);
            }
        })
        fs.rmdirSync(nDir);
    }
}
function clearDirectory(nDir) {
    removeDirectory(nDir)
    fs.mkdirSync(nDir)
}
function writeFile(filename, txt) {
    console.log(filename)
    fs.writeFile(filename, txt, fnError)
}
function makeDirectory(nDir){
    if (!fs.existsSync(nDir)){
        fs.mkdirSync(nDir);
    }
}
function logTask(modelType, models){
    const nbModels = Object.keys(models).length
    console.log('Evolutility-models v.'+pkg.version+
        ' -> Generating '+nbModels+' '+modelType+' models:');
}
const headComment = (modelType, m) => '/*\n  '+headEvol(modelType)+headSubject(m)+github[modelType]+'\n*/\n\n'
const headSubject = m => (m ? ' model for ' + (m.label || m.title || m.id) : ' Models')+'\n '
const headEvol = modelType => 'Evolutility ' + modelType
const txtExportModel = (modelType, model) => headComment(modelType, model)+
        'module.exports = '+JSON.stringify(model, null, '\t');

module.exports = {
    clearDirectory: clearDirectory,
    removeDirectory: removeDirectory,
    makeDirectory: makeDirectory,
    writeFile: writeFile,
    logTask: logTask,
    headComment: headComment,
    txtExportModel: txtExportModel,
}