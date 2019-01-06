/*!
    Evolutility-Models

    Functions to transform full models into ui/db models.

    https://github.com/evoluteur/evolutility-models
    (c) 2018 Olivier Giulieri
*/

const gField = (f) => {
    return {
        id: f.id,
        type: f.type, 
        label: f.label, 
        object: f.object || f.entity,
        required: f.required,
        readonly: f.readonly,
        noCharts: f.noCharts,
        list: f.list,
        lovicon: f.lovicon,
        max: f.max,
        min: f.min,
        maxLength: f.maxLength,
        minLength: f.minLength,
        defaultValue: f.defaultValue,
        inMany: f.inMany,
    }
}

const uiField = (f) => {
    let fld = gField(f)
    const props = ['label', 'width', 'height', 'help']
    props.forEach(function(prop){
        fld[prop] = f[prop]
    })
    return fld
}
const dbField = (f) => {
    let fld = gField(f)
    fld.column = f.column || f.dbcolumn || f.id
    if(f.type==='lov'){
        fld.lovtable = f.lovtable || f.dbtablelov
        fld.lovcolumn = f.lovcolumn || f.dbcolumnreadlov
    }
    return fld
}

const uiCollec = (collec) => ({
    id: collec.id,
    title: collec.title || collec.label,
    object: collec.object || collec.entity,
    icon: collec.icon,
    fields: collec.fields.map(uiField),
})
const dbCollec = (collec) => ({
    id: collec.id,
    table: collec.table,
    column: collec.column,
    object: collec.object || collec.entity,
    order: collec.order,
    fields: collec.fields.map(dbField)
})

module.exports = {

    uiModel: (m) => ({
        id: m.id,
        title: m.title || m.label,
        name: m.name,
        namePlural: m.namePlural,
        icon: m.icon,
        titleField: m.titleField,
        fields: m.fields.map(uiField),
        groups: m.groups,
        collections: m.collections ? m.collections.map(uiCollec) : [],
    }),

    dbModel: (m) => ({
        id: m.id,
        table: m.table,
        titleField: m.titleField,
        searchFields: m.searchFields,
        fields: m.fields.map(dbField),
        collections: m.collections ? m.collections.map(dbCollec) : [],
    }),

}