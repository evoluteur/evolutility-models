/*
	Evolutility Model for Worlds (set of apps)
	https://github.com/evoluteur/evolutility-models
*/

module.exports = {
	"id": "world",
	"world": "designer",
	"title": "Applications",
	"icon": "",
	"table": "evol_world",
	"schema": "evolutility",
	"name": "application",
	"namePlural": "applications",
	"titleField": "name",
	"searchFields": [
		"name",
		"description",
	],
	"fields": [
		{
			"id": "name",
			"label": "Name",
			"type": "text",
			"maxLength": 100,
			"required": true,
			"inMany": true,
			"width": 85,
			"column": "name"
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
			"height": 2
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
					"type": "text",
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