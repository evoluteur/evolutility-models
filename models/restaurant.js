/*
  Evolutility Model for Restaurants
*/

module.exports = {
	"id": "restaurant",
	"active": true,
	"table": "restaurant",
	"label": "Restaurants",
	"icon": "resto.gif",
	"name": "restaurant",
	"namePlural": "restaurants",
	"searchFields": [
		"name"
	],
	"fields": [
		{
			"type": "text",
			"id": "name",
			"label": "Name",
			"required": true,
			"width": 62,
			"inMany": true,
			"column": "name"
		},
		{
			"type": "lov",
			"id": "cuisine",
			"column": "cuisine_id",
			"label": "Cuisine",
			"width": 38,
			"list": [
				{
					"id": "1",
					"text": "French"
				},
				{
					"id": "2",
					"text": "Vietnamese"
				},
				{
					"id": "3",
					"text": "Chinese"
				},
				{
					"id": "4",
					"text": "Fusion"
				},
				{
					"id": "5",
					"text": "Japanese"
				},
				{
					"id": "6",
					"text": "Thai"
				},
				{
					"id": "7",
					"text": "Mexican"
				},
				{
					"id": "8",
					"text": "Mediterranean"
				},
				{
					"id": "9",
					"text": "American"
				},
				{
					"id": "10",
					"text": "Indian"
				},
				{
					"id": "11",
					"text": "Korean"
				},
				{
					"id": "12",
					"text": "Italian"
				},
				{
					"id": "13",
					"text": "Spanish"
				},
				{
					"id": "14",
					"text": "Others"
				}
			],
			"lovtable": "restaurant_cuisine",
			"inMany": true
		},
		{
			"type": "lov",
			"id": "price",
			"column": "price_id",
			"label": "Price",
			"width": 30,
			"list": [
				{
					"id": "1",
					"text": "$"
				},
				{
					"id": "2",
					"text": "$$"
				},
				{
					"id": "3",
					"text": "$$$"
				},
				{
					"id": "4",
					"text": "$$$$"
				},
				{
					"id": "5",
					"text": "$$$$$"
				}
			],
			"lovtable": "restaurant_price",
			"inMany": true
		},
		{
			"type": "url",
			"id": "web",
			"label": "web",
			"width": 32,
			"column": "web"
		},
		{
			"type": "url",
			"id": "yelp",
			"label": "yelp",
			"width": 38,
			"column": "yelp"
		},
		{
			"type": "textmultiline",
			"id": "schedule",
			"label": "Schedule",
			"maxLength": 1000,
			"width": 30,
			"height": 3,
			"column": "schedule"
		},
		{
			"type": "textmultiline",
			"id": "notes",
			"label": "Notes",
			"maxLength": 1000,
			"width": 32,
			"height": 3,
			"column": "notes"
		},
		{
			"type": "textmultiline",
			"id": "favorite",
			"label": "Favorite dish",
			"maxLength": 1000,
			"width": 38,
			"height": 3,
			"column": "favorite"
		},
		{
			"type": "text",
			"id": "phone",
			"label": "Phone",
			"maxLength": 20,
			"width": 50,
			"mini": "1",
			"column": "phone"
		},
		{
			"type": "textmultiline",
			"id": "address",
			"label": "Address",
			"maxLength": 150,
			"width": 100,
			"height": 2,
			"column": "address"
		},
		{
			"type": "text",
			"id": "city",
			"label": "City",
			"maxLength": 100,
			"width": 62,
			"inMany": true,
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
		}
	]
}