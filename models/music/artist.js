/*
	Evolutility Model for Music Artist
	https://github.com/evoluteur/evolutility-models
	(c) 2020 Olivier Giulieri
*/
module.exports = {
	"id": "artist",
	"oid": 8,
    "active": true,
	"position": 10,
	"world": "music",
	"icon": "star.png",
	"title": "Artists",
	"table": "music_artist",
	"name": "artist",
	"namePlural": "artists",
	"titleField": "name",
	"defaultViewMany": "cards",
	"noCharts": true,
	"noStats": true,
	"fields": [
		{
			"id": "name",
			"type": "text",
			"label": "Name",
			"column": "name", 
			"inMany": true,
			"required": true,
			"inSearch": true,
		},
		{
			"id": "url",
			"label": "Web site",
			"type": "url",
			"column": "url",
			"width": 70,
		},
		{
			"id": "bdate",
			"column": "bdate",
			"label": "Birth date",
			"type": "date",
			"column": "bdate",
			"width": 30,
		},
		{
			"id": "photo",
			"type": "image",
			"label": "Photo",
			"width": 100,
			"inMany": true,
			"column": "photo"
		},
		{
			"id": "description", 
			"column": "description", 
			"type": "textmultiline", 
			"label": "Description", 
			"height": 9,
			"inSearch": true,
		}
	],
	"groups": [
		{
			"id": "g1",
			"type": "panel",
			"label": "Artist",
			"width": 70,
			"fields": [
				"name",
				"url",
				"bdate",
				"description"
			]
		},
		{
			"id": "g2",
			"type": "panel",
			"label": "Photo",
			"width": 30,
			"fields": [
				"photo"
			]
		}
	],
	"collections": [
		{
			"id": "music_album",
			"label": "Albums",
			"icon": "cd.png",
			"table": "music_album",
			"object": "album",
			"column": "artist_id",
			"orderBy": "title",
			"fields": [
				"title",
				"cover",
				"length"
			]
		}
	],
}