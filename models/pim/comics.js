/*
  Evolutility Model for Graphic Novels
*/

module.exports = {
	"id": "comics",
	"world": "pim",
	"active": true,
	"label": "Graphic Novels",
	"name": "serie",
	"namePlural": "series",
	"icon": "comics.png",
	"titleField": "title",
	"table": "comics",
	"searchFields": [
		"title",
		"authors",
		"notes"
	],
	"fields": [
		{
			"id": "title",
			"type": "text",
			"label": "Title",
			"required": true,
			"maxLength": 255,
			"width": 100,
			"inMany": true,
			"column": "title"
		},
		{
			"id": "authors",
			"type": "text",
			"width": 62,
			"inMany": true,
			"label": "Authors",
			"column": "authors"
		},
		{
			"id": "genre",
			"type": "lov",
			"label": "Genre",
			"width": 38,
			"inMany": true,
			"list": [
                {id: 1, text: 'Adventure'},
                {id: 3, text: 'Erotic'},
                {id: 2, text: 'Fairy tale'},
                {id: 4, text: 'Fantastic'},
                {id: 14, text: 'Graphic novel'},
                {id: 5, text: 'Heroic Fantasy'},
                {id: 6, text: 'Historic'},
                {id: 7, text: 'Humor'},
                {id: 8, text: 'One of a kind'},
                {id: 11, text: 'Science-fiction'},
                {id: 12, text: 'Super Heros'},
                {id: 10, text: 'Thriller'},
                {id: 13, text: 'Western'},
                {id: 9, text: 'Youth'},
			],
			"column": "genre_id",
			"lovtable": "comics_genre"
		},
		{
			"id": "serie_nb",
			"type": "integer",
			"width": 15,
			"inMany": true,
			"label": "Albums",
			"noCharts": true,
			"column": "serie_nb",
			"inCharts": false
		},
		{
			"id": "have_nb",
			"type": "integer",
			"width": 15,
			"inMany": true,
			"label": "Owned",
			"noCharts": true,
			"column": "have_nb",
			"inCharts": false
		},
		{
			"id": "have",
			"type": "text",
			"width": 15,
			"inMany": false,
			"label": "Have",
			"column": "have"
		},
		{
			"id": "language",
			"type": "lov",
			"label": "Language",
			"width": 17,
			"inMany": true,
			"lovicon": true,
			"list": [
				{
					"id": 2,
					"text": "French",
					"icon": "flag_fr.gif"
				},
				{
					"id": 1,
					"text": "American",
					"icon": "flag_us.gif"
				}
			],
			"column": "language_id",
			"lovtable": "comics_language"
		},
		{
			"id": "complete",
			"type": "boolean",
			"width": 19,
			"inMany": true,
			"label": "Complete",
			"column": "complete",
			"labelFalse": "Incomplete",
			"labelTrue": "Complete"
		},
		{
			"id": "finished",
			"type": "boolean",
			"width": 19,
			"inMany": true,
			"label": "Finished",
			"column": "finished",
			"labelTrue": "Finished",
			"labelFalse": "Not finished",
			"css": "cBlue"
		},
		{
			"id": "url_bdfugue",
			"type": "url",
			"width": 62,
			"label": "BDFugue",
			"column": "url_bdfugue",
		},
		{
			"id": "url_amazon",
			"type": "url",
			"width": 38,
			"label": "Amazon",
			"column": "url_amazon",
		},
		{
			"id": "pix",
			"type": "image",
			"width": 30,
			"inMany": true,
			"label": "Album Cover",
			"column": "pix"
		},
		{
			"id": "notes",
			"type": "textmultiline",
			"label": "Notes",
			"maxLength": 1000,
			"width": 100,
			"height": 7,
			"inMany": false,
			"column": "notes"
		}
	],
	"groups": [
		{
			"id": "serie",
			"type": "panel",
			"label": "Serie",
			"width": 70,
			"fields": [
				"title",
				"authors",
				"genre",
				"serie_nb",
				"have_nb",
				"have",
				"language",
				"complete",
				"finished",
				"url_bdfugue",
				"url_amazon",
				"notes"
			]
		},
		{
			"id": "pix",
			"type": "panel",
			"label": "Album Cover",
			"width": 30,
			"fields": [
				"pix"
			]
		}
	]
}