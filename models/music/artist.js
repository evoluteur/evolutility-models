module.exports = {
	"id": "artist",
	world: 'music',
	title: 'Artists',
	"table": "music_artist",
	"name": "artist",
	"namePlural": "artists",
	"titleField": "name",
	defaulViewMany: 'cards',
	"fields": [
		{
			"id": "name",
			"type": "text",
			"label": "Name",
			"column": "name", 
			"height": 1,
			"width": 80,
			"inMany": true
		},
		{
			"id": "url",
			label: 'Web site',
			"type": "url",
			"column": "url",
		},
		{
			"id": "url_wiki",
			label: 'Wikipedia',
			"type": "url_wiki",
			"column": "url",
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
			"table": "music_album",
			"object": "album",
			"column": "artist_id",
			"order": "title",
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