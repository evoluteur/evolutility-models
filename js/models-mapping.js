/*!
    Evolutility-UI-React
    https://github.com/evoluteur/evolutility-ui-react
    (c) 2018 Olivier Giulieri

    Function to transform full element into ui or db elements.
*/

const uiField = (f) => ({
    id: f.id,
    type: f.type, 
    label: f.label, 
    entity: f.entity, //TODO: rename it
    required: f.required,
    readonly: f.readonly,
    help: f.help,
    width: f.width, 
    height: f.height,
    noCharts: f.noCharts,
    list: f.list,
    lovicon: f.lovicon,
    max: f.max,
    min: f.min,
    maxLength: f.maxLength,
    minLength: f.minLength,
    defaultValue: f.defaultValue,
    inMany: f.inMany,
})
const dbField = (f) => ({
    id: f.id,
    type: f.type, 
    //label: f.label, 
    column: f.column || f.dbcolumn || f.id,
    lovtable: f.lovtable || f.dbtablelov,
    lovcolumn: f.lovcolumn || f.dbcolumnreadlov,
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
})
const uiCollec = (collec) => ({
    id: collec.id,
    title: collec.title,
    icon: collec.icon,
    name: collec.name,
    namePlural: collec.namePlural, 
    fields: collec.fields.map(uiField),
})
const dbCollec = (collec) => ({
    id: collec.id,
    label: collec.label,
    namePlural: collec.namePlural,
    table: collec.table,
    column: collec.column,
    entity: collec.entity,
    order: collec.order,
    fields: collec.fields.map(dbField)
})

module.exports = {

    uiModel: (m) => ({
        id: m.id,
        title: m.title,
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