/*!
    Evolutility-Models

    Functions to transform full models into ui/db models.

    https://github.com/evoluteur/evolutility-models
    (c) 2019 Olivier Giulieri
*/

const gField = f => ({
    id: f.id,
    type: f.type, 
    label: f.label, 
    object: f.object || f.entity,
    required: f.required,
    readOnly: f.readOnly,
    noCharts: f.noCharts,
    list: f.list,
    lovIcon: f.lovIcon,
    max: f.max,
    min: f.min,
    maxLength: f.maxLength,
    minLength: f.minLength,
    defaultValue: f.defaultValue,
    inMany: f.inMany,
})

const uiProps = ['labelShort', 'width', 'height', 'chartType', 'help']
const uiField = f => {
    let fld = gField(f)
    uiProps.forEach(function(prop){
        fld[prop] = f[prop]
    })
    return fld
}
const dbField = f => {
    let fld = gField(f)
    fld.column = f.column || f.dbcolumn || f.id
    if(f.type==='lov'){
        fld.lovTable = f.lovTable || f.dbtablelov
        fld.lovColumn = f.lovColumn || f.dbcolumnreadlov
        fld.lovIcon = f.lovIcon || false
    }
    if(f.deleteTrigger){
        fld.deleteTrigger = true
    }
    return fld
}

const uiCollec = collec => ({
    id: collec.id,
    title: collec.title || collec.label,
    object: collec.object || collec.entity,
    icon: collec.icon,
    fields: collec.fields.map(uiField),
})
const dbCollec = collec => ({
    id: collec.id,
    table: collec.table,
    column: collec.column,
    object: collec.object || collec.entity,
    order: collec.order,
    fields: collec.fields.map(dbField)
})

module.exports = {

    uiModel: m => ({
        id: m.id,
        title: m.title || m.label,
        name: m.name,
        namePlural: m.namePlural,
        icon: m.icon,
        defaultViewMany: m.defaultViewMany || 'list',
        defaultViewOne: m.defaultViewOne || 'browse',
        titleField: m.titleField,
        fields: m.fields.filter(f => !f.onlyDB).map(uiField),
        groups: m.groups,
        collections: m.collections ? m.collections.map(uiCollec) : [],
    }),

    dbModel: m => ({
        id: m.id,
        pKey: m.pKey || 'id',
        table: m.table,
        titleField: m.titleField,
        searchFields: m.searchFields,
        fields: m.fields.filter(f => !f.onlyUI).map(dbField),
        collections: m.collections ? m.collections.map(dbCollec) : [],
    }),

}