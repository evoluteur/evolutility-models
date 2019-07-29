module.exports = {
	"id": "track",
    "active": true,
	world: 'music',
	icon: 'music.png',
	title: 'Tracks',
	"table": "music_track",
	"name": "track",
	"namePlural": "tracks",
	"titleField": "name",
	"fields": [
		{
			"id": "name",
			"type": "text",
			"label": "Name",
			"column": "name",
			"required": true,
			"height": 3,
			"width": 100,
			"inMany": true
		},
		{
			"id": "album",
			"type": "lov",
			"label": "Album",
			"column": "album_id",
			object: 'album',
			"height": 1,
			"width": 100,
			"inMany": true,
			"lovTable": "music_album",
			"lovColumn": "title",
		},
		{
			"id": "length",
			"type": "text",
			"label": "Length",
			"column": "length",
			"width": 38,
			"inMany": true
		},
		{
			"id": "genre",
			"type": "lov",
			"label": "Genre",
			"column": "genre_id",
			"width": 62,
			"inMany": true,
			"lovTable": "music_genre",
			list:[
				{
					id: 1,
					text: "Blues"
				},
				{
					id: 2,
					text: "Classical"
				},
				{
					id: 3,
					text: "Country"
				},
				{
					id: 4,
					text: "Electronic"
				},
				{
					id: 5,
					text: "Folk"
				},
				{
					id: 6,
					text: "Jazz"
				},
				{
					id: 7,
					text: "New age"
				},
				{
					id: 8,
					text: "Reggae"
				},				
			]
		},
	]
}