/*
    Create DB models from full models
    https://github.com/evoluteur/evolutility-models
*/
const fs = require('fs');
const mfn = require('./models-mapping.js');
const models = require('../models/all_models.js');
const github = 'https://github.com/evoluteur/evolutility-server-node'

let dir = 'models-server'
//let dir = '../evolutility-server-node/models'
let allModels = []

console.log('Evolutility - Generating DB models:');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

// - Generate DB models
dir = dir +'/'
for(let mid in models){
    const m = models[mid]
    const newm = mfn.dbModel(m)
    let filename = dir + m.id + '.js'

    allModels.push(newm.id)

    const txt = '/*\n  Evolutility DB Model for '+(m.label||m.title||m.id)+
        '\n  '+github+
        '\n*/\n\nmodule.exports = '+
        JSON.stringify(newm, null, '\t');

    console.log(filename);
    fs.writeFile(filename, txt, function(err){
        if (err){
            throw err;
        }
    })
 
}

// - Generate "all_models.js" with list of models
if(!dir.startsWith('../')){
    const txt = '/*\n  Evolutility DB Models'+
        '\n  '+github+
        '\n*/\n\nmodule.exports = {\n'+
            allModels.map(mid => `    ${mid}: require('./${mid}')`).join(',\n')+
        '\n}'

    filename = dir+'all_models.js'
    console.log(filename+'\n')
    fs.writeFile(filename, txt, function(err){
        if (err){
            throw err;
        }
    })
}
