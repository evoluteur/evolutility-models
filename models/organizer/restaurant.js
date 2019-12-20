/*
  Evolutility Model for Restaurants
*/

module.exports = {
	"id": "restaurant",
	"oid": 4,
	"world": "organizer",
	"active": true,
	position: 30,
	"table": "restaurant",
	"titleField": "name",
	"label": "Restaurants",
	"icon": "resto.gif",
	"name": "restaurant",
	"namePlural": "restaurants",
	"searchFields": [
		"name",
		"web",
		"notes",
		"favorites"
	],
	noStats: true,
	"fields": [
		{
			"id": "name",
			"type": "text",
			"label": "Name",
			"required": true,
			"width": 62,
			"inMany": true,
			"column": "name"
		},
		{
			"id": "cuisine",
			"type": "lov",
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
			"lovTable": "restaurant_cuisine",
			"inMany": true
		},
		{
			"id": "price",
			"type": "lov",
			"column": "price_id",
			"label": "Price",
			"width": 38,
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
			"lovTable": "restaurant_price",
			"inMany": true
		},
		{
			"id": "web",
			"type": "url",
			"label": "web",
			"width": 100,
			"column": "web"
		},
		{
			"id": "yelp",
			"type": "url",
			"label": "Yelp",
			"width": 62,
			"column": "yelp"
		},
		{
			"id": "notes",
			"type": "textmultiline",
			"label": "Notes",
			"maxLength": 2000,
			"width": 32,
			"height": 6,
			"column": "notes"
		},
		{
			"id": "hours",
			"type": "textmultiline",
			"label": "Hours",
			"width": 30,
			"height": 6,
			"column": "hours"
		},
		{
			"id": "favorite",
			"type": "textmultiline",
			"label": "Favorite dish",
			"maxLength": 2000,
			"width": 38,
			"height": 6,
			"column": "favorite"
		},
		{
			"id": "phone",
			"type": "text",
			"label": "Phone",
			"maxLength": 20,
			"width": 100,
			"column": "phone"
		},
		{
			"id": "address",
			"type": "textmultiline",
			"label": "Address",
			"maxLength": 150,
			"width": 100,
			"height": 2,
			"column": "address"
		},
		{
			"id": "city",
			"type": "text",
			"label": "City",
			"maxLength": 100,
			"width": 50,
			"inMany": true,
			"column": "city"
		},
		{
			"id": "state",
			"type": "text",
			"label": "State",
			"width": 15,
			"column": "state"
		},
		{
			"id": "zip",
			"type": "text",
			"label": "Zip",
			"maxLength": 12,
			"width": 20,
			"column": "zip"
		}
	],

    groups: [
        {
          id:"pResto", type:"panel", 
          label: "Restaurant", width: 62,
          fields: ['name','cuisine','schedule','yelp','price','favorite','notes','hours']
        },
        {
          id:"pContact", type:"panel", 
          label: "Contact", width: 38,
          fields: ['phone','web','address','city','state','zip',]
        },
    ]
}