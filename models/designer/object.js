/*
	Evolutility Model for Model/Object
	https://github.com/evoluteur/evolutility-models
*/

module.exports = {
	"id": "object",
	"world": "designer",
	"title": "Objects",
	"icon": "/designer/edi_frm.png",
	"schema": "evolutility",
	"name": "object",
	"namePlural": "objects",
	"titleField": "title",
	"table": "evol_object",
	"searchFields": [
		"title",
		"name",
		"table",
		"description",
	],
	"fields": [
		{
			"id": "title",
			"column": "title",
			"label": "Title",
			"help": "example: 'Address book'",
			"type": "text",
			"maxLength": 200,
			"inMany": true,
			"width": 82,
			"required": true
		},
		{
			"id": "active",
			"label": "Active",
			"type": "boolean",
			"column": "active",
			"inMany": true,
			"width": 18
		},
		{
			"id": "world",
			"type": "lov",
			"label": "World",
			"width": 62,
			"table": "evol_world",
			"inMany": true,
			"column": "world_id",
			"lovTable": "evol_world",
			"object": "world"
		},
		{
			"id": "noCharts",
			"label": "No Charts",
			"type": "boolean",
			"column": "nocharts",
			"width": 30
		},
		{
			"id": "noStats",
			"label": "No Stats",
			"type": "boolean",
			"column": "nostats",
			"width": 30
		},
		{
			"id": "table",
			"column": "table",
			"label": "DB Table name",
			"type": "text",
			"width": 62,
			"maxLength": 63,
			"required": true,
			"inMany": true
		},
		{
			"id": "pKey",
			"column": "pkey",
			"label": "Primary key column",
			"help": 'By default the primary key is called "id". This property let\'s you use another column name.',
			"type": "text",
			"width": 38
		},
		{
			"id": "entity",
			"column": "entity",
			"label": "Object Id",
			"type": "text",
			"help": "Unique identifier for the object",
			"maxLength": 100,
			"required": true,
			"inMany": true,
			"width": 75
		},
		{
			"id": "name",
			"label": "Object name (singular)",
			"help": "example: 'contact'",
			"type": "text",
			"column": "name",
			"required": true,
			"maxLength": 50,
			"inMany": true,
			"width": 62
		},
		{
			"id": "namePlural",
			"label": "name (plural)",
			"help": "example: 'contacts'",
			"type": "text",
			"column": "nameplural",
			"required": true,
			"maxLength": 50,
			"width": 38
		},
		{
			"id": "icon",
			"label": "Icon",
			"type": "image",
			"column": "icon",
			"maxLength": "50",
			"width": 62,
			"help": "example='contact.gif'",
			"readOnly": true,
			"inMany": true
		},

		{
			"id": "titleField",
			"label": "Title field",
			"help": "Id of the field used as record title",
			"type": "text",
			"column": "titlefield",
			"width": 38
		},
		{
			"id": "searchFields",
			"label": "Search fields",
			"help": "Ids of the fields used in searches.",
			"type": "textmultiline",
			"column": "searchfields",
			"width": 62,
			"height": 2,
		},
		{
			"id": "description",
			"label": "Description",
			"type": "textmultiline",
			"column": "description",
			"maxLength": 250,
			"width": 100,
			"height": 4
		},/*
		{
			"id": "layout",
			"label": "Layout",
			"labelMany": "Layout",
			"type": "json",
			"column": "layout",
			"height": 5
		}*/,

		{
			"id": "groups",
			"label": "Fields groups",
			"type": "json",
			"column": "groups",
			"height": 5
		},
		{
			"id": "collections",
			"label": "Collections",
			"type": "json",
			"column": "collections",
			"height": 5
		}
	],
	"groups": [
		{
			"id": "p1",
			"type": "panel",
			"label": "Object",
			"width": 62,
			"fields": [
				"title",
				"active",
				"name",
				"namePlural",
				"world",
				"table",
				"titleField",
				"searchFields",
				//"layout",
				"groups",
				"collections",
			]
		},
		{
			"id": "p2",
			"type": "panel",
			"label": "Info",
			"width": 38,
			"fields": [
				"entity",
				"icon",
				"noCharts",
				"noStats",
				"description",
			]
		}
	],
	"collections": [
		{
			"id": "collec-fields",
			"table": "evol_field",
			"column": "object_id",
			"object": "field",
			"orderBy": "position, t1.id",
			"fields": [
				{
					"id": "label",
					"column": "label",
					"label": "Label",
					"type": "text",
				},
				{
					"id": "column",
					"column": "dbcolumn",
					"label": "Column",
				},
				{
					"id": "type",
					"type": "lov",
					"label": "Type",
					//"list": fieldTypes,
					"column": "type_id",
					"lovTable": "evol_field_type",
					"lovColumn": "name",
					"lovIcon": true,
				},
				{
					"id": "inMany",
					"column": "inmany",
					"label": "List",
					"type": "boolean",
				},
				{
					"id": "width",
					"column": "width",
					"label": "Width",
					"defaultValue": 100,
					"type": "integer",
					"format": "0 '%'",
				},
				{
					"id": "height",
					"column": "height",
					"label": "Height",
					"type": "integer",
				},
				{
					"id": "required",
					"column": "required",
					"label": "Required",
					"type": "boolean",
				}
			]
		}
	],
}