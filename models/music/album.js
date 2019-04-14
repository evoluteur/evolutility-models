module.exports = {
	"id": "album",
    "active": true,
	"world": 'music',
	"title": "Albums",
	"table": "music_album",
	"name": "album",
	"namePlural": "albums",
	"titleField": "name",
	"defaulViewMany": 'cards',
	"fields": [
		{
			"id": "title",
			"type": "text",
			"label": "Title",
			"column": "title",
			"required": true,
			"height": 1,
			"width": 62,
			"inMany": true
		},
		{
			"id": "url",
			"label": "Amazon",
			"type": "url",
			"column": "url",
		},
		{
			"id": "artist",
			"type": "lov",
			"label": "Artist",
			"column": "artist_id",
			"required": true,
			"height": 1,
			"width": 38,
			"inMany": true,
			entity: 'artist',
			"lovTable": "music_artist",
			"lovColumn": "name"
		},
		{
			id: 'description', 
			column: 'description', 
			type: 'textmultiline', 
			label: 'Description', 
			maxLength: 1000,
			inMany: false
		},
		{
			"id": "cover",
			"type": "image",
			"label": "Album Cover",
			"width": 100,
			"inMany": true,
			"column": "cover"
		},
	],
	groups: [
		{
			"id": "p-album",
			"type": "panel",
			"label": "Album",
			table: 'music_album',
			column: 'album_id',
			"width": 70,
			"fields": [
				"title",
				"artist",
				"url",
				'description'
			]
		},
		{
			"id": "p-cover",
			"type": "panel",
			"label": "Cover",
			"width": 30,
			"fields": [
				"cover"
			]
		}
	],
	"collections": [
		{
			"id": "music_track",
			"label": "Tracks",
			"table": "music_track",
			"column": "album_id",
			"order": "name",
			"object": "track",
			"fields": [
				{
					"id": "name",
					"type": "text",
					"label": "Track",
					"column": "name",
					"inMany": true, 
				},
				{
					"id": "genre",
					"type": "lov",
					"label": "Genre",
					"column": "genre_id",
					"lovTable": "music_genre",
				},
				{
					"id": "length",
					"type": "text",
					"label": "Length",
					"column": "length",
					"inMany": true
				},
			]
		}
	],
}