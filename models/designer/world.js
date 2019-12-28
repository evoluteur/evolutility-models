/*
	Evolutility Model for Worlds (set of objects)
	https://github.com/evoluteur/evolutility-models
	(c) 2019 Olivier Giulieri
*/

module.exports = {
	"id": "world",
	"world": "designer",
	"icon": "",
	"title": "Worlds",
	"table": "evol_world",
	"schema": "evolutility",
	"name": "world",
	"namePlural": "worlds",
	"titleField": "name",
	"fields": [
		{
			"id": "name",
			"label": "Name",
			"type": "text",
			"maxLength": 100,
			"required": true,
			"inMany": true,
			"width": 85,
			"column": "name",
			"inSearch": true
		},
		{
			"id": "active",
			"column": "active",
			"label": "Active",
			"type": "boolean",
			"inMany": true,
			"width": 15
		},
		{
			"id": "description",
			"column": "description",
			"label": "Description",
			"type": "textmultiline",
			"maxLength": 500,
			"width": 85,
			"height": 2,
			"inSearch": true
		},
		{
			"id": "position",
			"column": "position",
			"label": "Position",
			"help": "Order of the field",
			"type": "integer",
			"maxLength": 3,
			"width": 15
		},
	],
	"collections": [
		{
			"table": "evol_object",
			"column": "world_id",
			"id": "collec-objects",
			"title": "Objects",
			"object": "object",
			"fields": [
				{
					"id": "title",
					"column": "title",
					"label": "Title",
					"type": "text",
				},
				{
					"label": "Icon",
					"type": "image",
					"id": "icon",
					"column": "icon",
				},
				{
					"label": "Active",
					"type": "boolean",
					"id": "active",
					"column": "active",
				},
			]
		}
	]
}