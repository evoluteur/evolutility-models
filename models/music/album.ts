/*
	Evolutility Model for Music Album
	https://github.com/evoluteur/evolutility-models
	(c) 2026 Olivier Giulieri
*/

import { FieldType, type Model } from "../../scripts/types.js";

export const album = {
  id: "album",
  oid: 7,
  active: true,
  position: 20,
  world: "music",
  icon: "cd.png",
  title: "Albums",
  table: "music_album",
  name: "album",
  namePlural: "albums",
  titleField: "name",
  defaultViewMany: "cards",
  noStats: true,
  fields: [
    {
      id: "title",
      type: FieldType.text,
      label: "Title",
      column: "title",
      required: true,
      width: 62,
      inMany: true,
      inSearch: true,
    },
    {
      id: "artist",
      type: FieldType.lov,
      label: "Artist",
      column: "artist_id",
      required: true,
      width: 38,
      inMany: true,
      object: "artist",
      lovTable: "music_artist",
      lovColumn: "name",
    },
    {
      id: "url",
      label: "Amazon",
      type: FieldType.url,
      column: "url",
      width: 62,
    },
    {
      id: "length",
      type: FieldType.text,
      label: "Length",
      column: "length",
      width: 38,
      inMany: true,
    },
    {
      id: "description",
      column: "description",
      type: FieldType.textmultiline,
      label: "Description",
      maxLength: 1000,
      width: 100,
      height: 8,
      inMany: false,
      inSearch: true,
    },
    {
      id: "cover",
      type: FieldType.image,
      label: "Cover",
      width: 100,
      inMany: true,
      column: "cover",
    },
  ],
  groups: [
    {
      id: "p-album",
      type: "panel",
      label: "Album",
      width: 70,
      fields: ["title", "artist", "url", "length", "description"],
    },
    {
      id: "p-cover",
      type: "panel",
      label: "Cover",
      width: 30,
      fields: ["cover"],
    },
  ],
  collections: [
    {
      id: "music_track",
      label: "Tracks",
      icon: "music.png",
      table: "music_track",
      column: "album_id",
      orderBy: "name",
      object: "track",
      fields: ["name", "genre", "length"],
    },
  ],
} satisfies Model;
