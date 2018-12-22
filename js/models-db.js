/*
Create DB models from full models
*/
var fs = require('fs');

var mfn = require('./models-mapping.js');
var models = require('../models/all_models.js');
var dir = 'gen-db'
var allModels = []

console.log('Generating DB models in directory "'+dir+'".');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
dir = dir +'/'
for(var mid in models){
    var m = models[mid]
    var newm = mfn.dbModel(m)

    allModels.push(newm.id) 

    console.log(m.name);
    const txt = '/*\n  Evolutility DB Model for '+(m.label||m.title)+
    '\n  https://github.com/evoluteur/evolutility-server-node'+
        '\n*/\n\nmodule.exports = '+
        JSON.stringify(newm, null, '\t');

    fs.writeFile(dir+m.id+'.js', txt, function(err){
        if (err){
            throw err;
        }
    })
 
}

var txt = allModels.map(mid => `    ${mid}: require('./${mid}')`).join(',\n')
fs.writeFile(dir+'all_models.js', 'module.exports = {\n'+txt+'\n}', function(err){
    if (err){
        throw err;
    }
}) 
