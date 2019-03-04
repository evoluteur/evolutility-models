/*
	Evolutility Model for Model/Object
	https://github.com/evoluteur/evolutility-models
*/

module.exports = {
	"id": "object",
  "world": "designer",
	"title": "Object",
	"icon": "cube.gif",
	"schema": "evolutility",
	"name": "object",
	"namePlural": "objects",
	"titleField": "title",
	"table": "evol_object",
	"active": true,
	"fields": [
		{
			"id": "title",
			"column": "title",
			"label": "Title",
			"help": "example: 'Address book'",
			"type": "text",
			"maxLength": 200,
			"inMany": true,
			"width": 80,
			"required": true
		},
		{
			"label": "Active",
			"type": "boolean",
			"id": "active",
			"column": "active",
			"inMany": true,
			"width": 20
		},
		{
			"type": "lov",
			"id": "world",
			"label": "World",
			"width": 100,
			"table": "evol_world",
			"inMany": true,
			"column": "world_id",
			"lovtable": "evol_world",
			"object": "world"
		},
		{
			"id": "table",
			"column": "table",
			"label": "DB Table name",
			"type": "text",
			"width": 38,
			"maxLength": 100,
			"required": true,
			"inMany": true
		},
		{
			"id": "entity",
			"column": "entity_name",
			"label": "Entity Id",
			"type": "text",
			"help": "Internal identifier for the entity",
			"maxLength": 100,
			"required": true,
			"inMany": true,
			"width": 75
		},
		{
			"label": "Object name (singular)",
			"help": "example: 'contact'",
			"type": "text",
			"id": "name",
			"column": "name",
			"required": true,
			"maxLength": 50,
			"inMany": true,
			"width": 62
		},
		{
			"label": "name (plural)",
			"help": "example: 'contacts'",
			"type": "text",
			"id": "namePlural",
			"column": "namePlural",
			"required": true,
			"maxLength": 50,
			"width": 38
		},
		{
			"label": "Icon",
			"type": "image",
			"id": "icon",
			"column": "icon",
			"maxLength": "50",
			"width": 62,
			"help": "example='contact.gif'",
			"readonly": true,
			"inMany": true
		},
		{
			"label": "Description",
			"type": "textmultiline",
			"id": "description",
			"column": "description",
			"maxLength": 250,
			"width": 100,
			"height": 4
		},/*
		{
			"label": "Layout",
			"labelMany": "Layout",
			"type": "json",
			"id": "layout",
			"column": "layout",
			"height": 5
		}*/
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
				//"layout"
			]
		},
		{
			"id": "p2",
			"type": "panel",
			"label": "Info",
			"width": 38,
			"fields": [
				"entity_name",
				"icon",
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
					"label": "column",
				},
				{
					"id": "inMany",
					"column": "inMany",
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