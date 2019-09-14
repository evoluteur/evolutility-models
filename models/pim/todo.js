/*
  Evolutility Model for To-Do List
*/

module.exports = {
	"id": "todo",
	"world": "pim",
	"active": true,
	"label": "To-Do List",
	"name": "task",
	"namePlural": "tasks",
	"icon": "todo.gif",
	"titleField": "title",
	"table": "task",
	"searchFields": [
		"title",
		"description"
	],
	"fields": [
		{
			"id": "title",
			"label": "Title",
			"type": "text",
			"width": 100,
			"required": true,
			"inMany": true,
			"column": "title",
			"maxLength": 255
		},
		{
			"id": "duedate",
			"type": "date",
			"label": "Due Date",
			"width": 38,
			"inMany": true,
			"column": "duedate"
		},
		{
			"id": "category",
			"type": "lov",
			"label": "Category",
			"list": [
				{
					"id": 1,
					"text": "Home"
				},
				{
					"id": 2,
					"text": "Work"
				},
				{
					"id": 3,
					"text": "Fun"
				},
				{
					"id": 4,
					"text": "Others"
				},
				{
					"id": 5,
					"text": "Misc."
				}
			],
			"width": 62,
			"inMany": true,
			"column": "category_id",
			"lovTable": "task_category"
		},
		{
			"id": "priority",
			"type": "lov",
			"label": "Priority",
			"width": 100,
			"inMany": true,
			"list": [
				{
					"id": 1,
					"text": "1 - ASAP"
				},
				{
					"id": 2,
					"text": "2 - Urgent"
				},
				{
					"id": 3,
					"text": "3 - Important"
				},
				{
					"id": 4,
					"text": "4 - Medium"
				},
				{
					"id": 5,
					"text": "5 - Low"
				}
			],
			"defaultValue": 4,
			"column": "priority_id",
			"required": true,
			"lovTable": "task_priority"
		},
		{
			"id": "complete",
			"type": "boolean",
			"label": "Complete",
			"width": 100,
			"inMany": true,
			"column": "complete"
		},
		{
			"id": "description",
			"type": "textmultiline",
			"label": "Description",
			"height": 5,
			"column": "description",
			"maxLength": 1000,
			"inMany": false
		}
	],
	"groups": [
		{
			"id": "p1",
			"type": "panel",
			"label": "Task",
			"width": 62,
			"fields": [
				"title",
				"duedate",
				"category"
			]
		},
		{
			"id": "p2",
			"type": "panel",
			"label": "Status",
			"width": 38,
			"fields": [
				"priority",
				"complete"
			]
		},
		{
			"id": "p3",
			"type": "panel",
			"label": "Task Description",
			"width": 100,
			"fields": [
				"description"
			]
		}
	]
}