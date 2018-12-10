/*
Create "ui" models from full models
*/
var fs = require('fs');

var models = require('../models/all_models.js');
var dir = 'gen-db'
var allModels = []

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
console.log('Generating DB models in directory "'+dir+'".');
dir = dir +'/'
for(var mid in models){
    var m = models[mid]
    var newm = {
        id: m.id,
        table: m.table,
        titleField: m.titleField,
        searchFields: m.searchFields,

        fields: m.fields.map(function(f){
            return {
                id: f.id,
                type: f.type, 
                //label: f.label, 
                column: f.column,
                lovtable: f.lovtable,
                lovcolumn: f.lovcolumn,
                required: f.required,
                readonly: f.readonly,
                noCharts: f.noCharts,
                list: f.list,
                inMany: f.inMany,
            }
        })
    }

    allModels.push(m.id) 

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
