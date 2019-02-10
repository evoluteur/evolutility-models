/*
    Create UI models from full models
    https://github.com/evoluteur/evolutility-models
*/
const fs = require('fs');
const mfn = require('./models-mapping.js');
const models = require('../models/all_models.js');
const github = 'https://github.com/evoluteur/evolutility-ui-react'

let dir = 'models-ui'
//let dir = '../evolutility-ui-react/src/models'
let allModels = []
let worlds = {}

console.log('Evolutility - Generating UI models:');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

// - Generate UI models
dir = dir + '/'
for(let mid in models){
    const m = models[mid]
    const newm = mfn.uiModel(m)
    let filename = dir + m.id + '.js'

    if(m.world){
        if(!worlds[m.world]){
            const nDir = dir + '/' + m.world
            if (!fs.existsSync(nDir)){
                fs.mkdirSync(nDir);
            }
            worlds[m.world] = true
        }
        filename = dir + m.world + '/' + m.id + '.js'
    }
    allModels.push({mid: m.id, path: m.world})

    console.log(filename);
    const txt = '/*\n  Evolutility UI Model for '+(m.label||m.title)+
    '\n  '+github+
        '\n*/\n\nmodule.exports = '+
        JSON.stringify(newm, null, '\t');

    fs.writeFile(filename, txt, function(err){
        if (err){
            throw err;
        }
    })
 
}

// - Generate "all_models.js" with list of models
const txt = '/*\n  Evolutility UI Models\n  '+github+'\n*/\n\n'+
    'import {prepModel} from \'../utils/dico\'\n\n'+
    allModels.map(m => `import ${m.mid} from './${m.path?m.path+'/':''}${m.mid}'`).join('\n') +
    '\n\nexport default {\n'+allModels.map(m => `    ${m.mid}: prepModel(${m.mid}),`).join('\n')+'\n}\n'

if(!dir.startsWith('../')){  
    filename = dir+'all_models.js'
    console.log(filename+'\n')
    fs.writeFile(filename, txt, function(err){
        if (err){
            throw err;
        }
    }) 
}