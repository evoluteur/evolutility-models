/*
Create "ui" models from full models
*/
var fs = require('fs');

var models = require('../models/all_models.js');
var dir = 'gen-ui'
var allModels = []

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
console.log('Generating UI models in "'+dir+'".');
dir = '' + dir + '/'
for(var mid in models){
    var m = models[mid]
    var newm = {
        id: m.id,
        label: m.label,
        name: m.name,
        namePlural: m.namePlural,
        icon: m.icon,
        titleField: m.titleField,
        searchFields: m.searchFields,
        fields: m.fields.map(function(f){
            return {
                id: f.id,
                type: f.type, 
                label: f.label, 
                required: f.required,
                readonly: f.readonly,
                width: f.width, 
                height: f.height,
                noCharts: f.noCharts,
                list: f.list,
                inMany: f.inMany,
            }
        }),
        groups: m.groups,
    }

    allModels.push(m.id) 

    console.log(m.name);
    const txt = '/*\n  Evolutility UI Model for '+(m.label||m.title)+
    '\nUI: https://github.com/evoluteur/evolutility-ui-react'+
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
