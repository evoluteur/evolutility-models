/*
  Evolutility Model for Address Book
*/

module.exports = {
	"id": "contact",
	"world": "pim",
	"active": true,
	"label": "Address book",
	"icon": "contact.gif",
	"table": "contact",
	"name": "contact",
	"namePlural": "contacts",
	"titleField": "fistname",
	"searchFields": [
		"lastname",
		"firstname",
		"jobtitle",
		"company"
	],
	"fields": [
		{
			"type": "text",
			"id": "lastname",
			"label": "Lastname",
			"maxLength": 50,
			"required": true,
			"width": 62,
			"inMany": true,
			"column": "lastname"
		},
		{
			"type": "text",
			"id": "firstname",
			"label": "Firstname",
			"maxLength": 50,
			"required": true,
			"width": 38,
			"inMany": true,
			"column": "firstname"
		},
		{
			"type": "text",
			"id": "jobtitle",
			"label": "Title",
			"maxLength": 50,
			"width": 62,
			"column": "jobtitle"
		},
		{
			"type": "text",
			"id": "company",
			"label": "Company",
			"maxLength": 50,
			"width": 38,
			"inMany": true,
			"column": "company"
		},
		{
			"type": "email",
			"id": "email",
			"label": "email",
			"maxLength": 100,
			"width": 100,
			"column": "email",
			"inMany": true
		},
		{
			"type": "url",
			"id": "web",
			"label": "web",
			"maxLength": 255,
			"width": 100,
			"column": "web"
		},
		{
			"type": "lov",
			"id": "category",
			"label": "Category",
			"width": 100,
			"list": [
				{id: 1, text: 'Friends'},
				{id: 2, text: 'Family'},
				{id: 3, text: 'Work'},
				{id: 4, text: 'Meditation'},
				{id: 5, text: 'Travel'},
				{id: 6, text: 'Business'},
				{id: 7, text: 'Sport'},
				{id: 8, text: 'Restaurants'},
				{id: 9, text: 'Misc.'}
			],
			"inMany": true,
			"column": "category_id",
			"lovTable": "contact_category"
		},
		{
			"type": "text",
			"id": "phone",
			"label": "Work Phone",
			"maxLength": 20,
			"width": 100,
			"mini": "1",
			"column": "phone"
		},
		{
			"type": "text",
			"id": "phonehome",
			"label": "Home Phone",
			"maxLength": 20,
			"width": 100,
			"column": "phonehome"
		},
		{
			"type": "text",
			"id": "phonecell",
			"label": "Cell.",
			"maxLength": 20,
			"width": 100,
			"mini": "1",
			"column": "phonecell"
		},
		{
			"type": "text",
			"id": "fax",
			"label": "Fax",
			"maxLength": 20,
			"width": 100,
			"column": "fax"
		},
		{
			"type": "textmultiline",
			"id": "address",
			"label": "Address",
			"width": 100,
			"height": 3,
			"column": "address"
		},
		{
			"type": "text",
			"id": "city",
			"label": "City",
			"maxLength": 100,
			"width": 62,
			"column": "city"
		},
		{
			"type": "text",
			"id": "state",
			"label": "State",
			"width": 23,
			"column": "state"
		},
		{
			"type": "text",
			"id": "zip",
			"label": "Zip",
			"maxLength": 12,
			"width": 15,
			"column": "zip"
		},
		{
			"type": "text",
			"id": "country",
			"label": "Country",
			"maxLength": 60,
			"width": 100,
			"column": "country"
		},
		{
			"type": "textmultiline",
			"id": "notes",
			"label": "Notes",
			"maxLength": 1000,
			"width": 100,
			"height": 6,
			"column": "notes"
		}
	],
	"groups": [
		{
			"type": "panel",
			"label": "Identity",
			"width": 62,
			"fields": [
				"lastname",
				"firstname",
				"jobtitle",
				"company",
				"email",
				"web"
			]
		},
		{
			"type": "panel",
			"label": "Contact Info",
			"width": 38,
			"fields": [
				"phone",
				"phonehome",
				"phonecell",
				"fax"
			]
		},
		{
			"type": "panel",
			"label": "Address",
			"width": 62,
			"fields": [
				"address",
				"city",
				"state",
				"zip",
				"country"
			]
		},
		{
			"type": "panel",
			"label": "Misc.",
			"width": 38,
			"fields": [
				"category",
				"notes"
			]
		}
	]
}