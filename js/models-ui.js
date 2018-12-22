/*
Create UI models from full models
*/
var fs = require('fs');

var mfn = require('./models-mapping.js');
var models = require('../models/all_models.js');
var dir = 'gen-ui'
var allModels = []

console.log('Generating UI models in "'+dir+'".');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
dir = '' + dir + '/'
for(var mid in models){
    var m = models[mid]
    var newm = mfn.uiModel(m)

    allModels.push(m.id) 

    console.log(m.name);
    const txt = '/*\n  Evolutility UI Model for '+(m.label||m.title)+
    '\n  https://github.com/evoluteur/evolutility-ui-react'+
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
