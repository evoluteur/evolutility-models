module.exports = {
	"id": "artist",
    "active": true,
	"world": 'music',
	icon: 'star.png',
	"title": 'Artists',
	"table": "music_artist",
	"name": "artist",
	"namePlural": "artists",
	"titleField": "name",
	"defaulViewMany": 'cards',
	"fields": [
		{
			"id": "name",
			"type": "text",
			"label": "Name",
			"column": "name", 
			"inMany": true,
			"required": true,
		},
		{
			"id": "url",
			label: 'Web site',
			"type": "url",
			"column": "url",
			width: 70,
		},
		{
			"id": "bdate",
			"column": "bdate",
			label: 'Birth date',
			"type": "date",
			"column": "bdate",
			width: 30,
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
			id: 'description', 
			column: 'description', 
			type: 'textmultiline', 
			label: 'Description', 
			height: 4,
		}
	],
	groups: [
		{
			"id": "g1",
			"type": "panel",
			"label": "Artist",
			"width": 70,
			"fields": [
				"name",
				"url",
				"bdate",
				'description'
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
				{
					"id": "title",
					"type": "text",
					"label": "Title",
					"column": "title",
				},
				{
					id: 'cover', 
					column: 'cover', 
					type: 'image', 
					label: 'Cover',
				}
			]
		}
	],
}