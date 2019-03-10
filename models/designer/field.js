/*
	Evolutility Model for Fields
	https://github.com/evoluteur/evolutility-models
*/

const fieldTypes = [
	{
		id: 1,
		"text": "Text",
		"icon": "designer/ft-txt.gif"
	},
	{
		id: 2,
		"text": "Text multiline",
		"icon": "designer/ft-txtml.gif"
	},
	{
		id: 3,
		"text": "Boolean",
		"icon": "designer/ft-bool.gif"
	},
	{
		id: 4,
		"text": "Decimal",
		"icon": "designer/ft-dec.gif"
	},
	{
		id: 5,
		"text": "Money",
		"icon": "designer/ft-money.gif"
	},
	{
		id: 6,
		"text": "Integer",
		"icon": "designer/ft-int.gif"
	},
	{
		id: 7,
		"text": "Date",
		"icon": "designer/ft-date.gif"
	},
	{
		id: 8,
		"text": "Time",
		"icon": "designer/ft-time.gif"
	},
	{
		id: 9,
		"text": "Date-time",
		"icon": "designer/ft-datetime.gif"
	},
	{
		id: 10,
		"text": "Image",
		"icon": "designer/ft-img.gif"
	},
	{
		id: 11,
		"text": "List (dropdown)",
		"icon": "designer/ft-lov.gif"
	},
	{
		id: 12,
		"text": "email",
		"icon": "designer/ft-email.gif"
	},
	{
		id: 13,
		"text": "Link",
		"icon": "designer/ft-url.gif"
	}
]

module.exports = {
	id: "field",
    "world": "designer",
	"title": "Fields",
	"schema": "evolutility",
	"icon": "edi_fld.png",
	"name": "field",
	"namePlural": "fields",
	"titleField": "label",
	"table": "evol_field",
	"active": true,
	"searchFields": [
		"label",
		"column",
		"help",
		"description",
	],
	"fields": [
		{
			id: "label",
			"label": "Label",
			"type": "text",
			"help": "Field title for the user",
			"maxLength": 100,
			"required": true,
			"inMany": true,
			"width": 62,
			"column": "label"
		},
		{
			id: "type",
			"type": "lov",
			"label": "Type",
			"list": fieldTypes,
			defaultValue: 1,
			"help": "Type of field: UI type rather than data type.",
			"width": 38,
			"required": true,
			"column": "type_id",
			"lovtable": "evol_field_type",
			"lovcolumn": "name",
			"lovicon": true,
			"inMany": true
		},
		{
			id: "column",
			"column": "dbcolumn",
			"label": "Column",
			"help": "Database column name",
			"required": true,
			"type": "text",
			"maxLength": 100,
			"width": 62
		},
		{
			id: "fid",
			"label": "Field ID",
			"type": "text",
			"help": "Field ID is not visible to the user but used in API and routing.",
			"required": true,
			"inMany": true,
			"width": 38,
			"column": "fid"
		},
		{
			id: "object",
			"label": "Object",
			"type": "lov",
			"object": "object",
			"required": true,
			"inMany": true,
			"noCharts": true,
			"width": 32,
			"column": "object_id",
			"lovtable": "evol_object",
			"lovcolumn": "title",
			"deletetrigger": true,
		},/*
		{
			id: "fieldgroup",
			"type": "lov",
			"label": "Group",
			"list": null,
			"help": "Group the field belong to.",
			"width": 38,
			"column": "field_group_id",
			"lovtable": "evol_field_group",
			"lovcolumn": "label",
			"lovicon": true,
			"inMany": true,
			object: 'fieldgroup',
		},*/
		{
			id: "lovtable",
			"column": "lovtable",
			"label": "LOV Table",
			"help": "Lookup table",
			"type": "text",
			"maxLength": 100,
			"width": 32
		},
		{
			id: "lovcolumn",
			"column": "lovcolumn",
			"label": "LOV column",
			"type": "text",
			"help": "Column fom Lookup table to display",
			"maxLength": 100,
			"width": 38
		},
		{
			id: "lovicon",
			"column": "lovicon",
			"label": "LOV Icon",
			"type": "text",
			"help": "Column fom Lookup table to display",
			"maxLength": 100,
			"width": 38
		},
		{
			id: "inMany",
			"column": "inMany",
			"label": "List",
			"help": "Field is used in summary lists",
			"type": "boolean",
			"inMany": true,
			"width": 50
		},
		{
			id: "position",
			"column": "position",
			"label": "Position",
			"help": "Order of the field",
			"type": "integer",
			"maxLength": 3,
			"width": 50
		},
		{
			id: "width",
			"column": "width",
			"label": "Width",
			"defaultValue": 100,
			"help": "Relative width of the field (in percentage)",
			"type": "integer",
			"format": "0 '%'",
			"maxLength": 3,
			"width": 50
		},
		{
			id: "height",
			"column": "height",
			"label": "Height",
			"help": "Height in number of lines (for \"Textmultiline\" fields)",
			"type": "integer",
			"maxLength": 3,
			"defaultValue": 1,
			"max": 30,
			"width": 50
		},
		{
			id: "css",
			"column": "css",
			"label": "CSS",
			"help": "Stylesheet class name for the field for the edit view.",
			"type": "text",
			"maxLength": 20,
			"width": 50
		},
		{
			id: "format",
			"column": "format",
			"label": "Format",
			"type": "text",
			"help": "example \"$ 0.00\"",
			"maxLength": 30,
			"width": 50
		},
		{
			id: "required",
			"column": "required",
			"label": "Required",
			"help": "Mandatory field",
			"type": "boolean",
			"inMany": true,
			"width": 50,
			"img": "checkr.gif"
		},
		{
			id: "readonly",
			"column": "readonly",
			"label": "Read only",
			"defaultValue": false,
			"help": "Users can view this field value but cannot modify it",
			"type": "boolean",
			"width": 50,
			"img": "checkr.gif"
		},
		{
			id: "minLength",
			"column": "minLength",
			"label": "Min. length",
			"help": "Minimum number of characters required",
			"type": "integer",
			"width": 50,
			"noCharts": true
		},
		{
			id: "maxLength",
			"column": "maxLength",
			"label": "Max. length",
			"help": "Maximum number of characters allowed",
			"type": "integer",
			"maxLength": 7,
			"width": 50,
			"noCharts": true
		},
		{
			id: "minvalue",
			"label": "Min. value",
			"labelList": "Min.",
			"help": "Minimum value allowed for the field",
			"type": "integer",
			"maxLength": 4,
			"width": 50,
			"noCharts": true,
			"column": "minValue"
		},
		{
			id: "maxvalue",
			"label": "Max. value",
			"labelList": "Max.",
			"help": "Maximum value allowed for the field",
			"type": "integer",
			"maxLength": 4,
			"width": 50,
			"noCharts": true,
			"column": "maxValue"
		},
		{
			id: "regExp",
			"column": "regExp",
			"label": "Regular Expression",
			"labelList": "RegExp",
			"type": "text",
			"maxLength": 100,
			"width": 50,
			"help": "Regular expression used to validate the field value."
		},
		{
			id: "noCharts",
			"column": "noCharts",
			"label": "Exclude from Charts",
			"type": "boolean",
			"width": 50,
			"help": "If chacked, the field\'s charts will not appear in the dashboard."
		},
		{
			id: "chartType",
			"column": "chartType",
			"label": "Default Chart Type",
			"type": "text",
			"width": 50,
			"help": "Possible values: Bars, Pie, or List."
		},
		{
			id: "help",
			"column": "help",
			"label": "Help",
			"help": "Help on the field for edition",
			"type": "textmultiline",
			"maxLength": 500,
			"width": 100,
			"height": 4
		},
		{
			id: "description",
			"column": "description",
			"label": "Description",
			"type": "textmultiline",
			"maxLength": 500,
			"width": 100,
			"height": 6
		},
		{
			id: "defaultValue",
			"column": "defaultValue",
			"label": "Default Value",
			"type": "text",
			width: 50,
		},
		{
			id: "deletetrigger",
			"column": "deletetrigger",
			"label": "Delete trigger",
			help: "If checked, deleting records in the lovtable will trigger a cascade delete (only for list (dropdown) fields).",
			"type": "boolean",
			width: 50,
		},
	],
    "groups": [
        {
            type: 'panel',
            label: 'Definition',
            width: 62,
            fields: [
				'label',
				'type',
				'column',
				'fid',
				'object',
				//'fieldgroup',
				'lovtable','lovcolumn'
			]
        },
        {
            type: 'panel',
            label: 'Layout',
            width: 38,
            fields: ['position','inMany','width','height','css','format','chartType','noCharts']
        },
        {
            type: 'panel',
            label: 'Validation',
            width: 62,
            fields: ['defaultValue','deletetrigger','required','readonly','minvalue','maxvalue','minLength','maxLength','regExp','noCharts']
        },
        {
            id: 'p-help',
            type: 'panel',
            label: 'Field Help',
            width: 38,
            fields: ['help','description']
        }
    ]
}