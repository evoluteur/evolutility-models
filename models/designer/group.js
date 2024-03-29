/*
	Evolutility Model for Field groups
	https://github.com/evoluteur/evolutility-models
	(c) 2022 Olivier Giulieri
*/

module.exports = {
  id: "group",
  world: "designer",
  schema: "evolutility",
  title: "Field Groups",
  table: "evol_object_group",
  active: true,
  icon: "designer/group.png",
  name: "group",
  namePlural: "groups",
  titleField: "label",
  position: 30,
  fields: [
    {
      id: "gid",
      label: "Group ID",
      type: "text",
      required: false,
      inMany: true,
      width: 38,
      column: "gid",
      inSearch: true,
    },
    {
      id: "label",
      label: "Label",
      type: "text",
      help: "Group title",
      maxLength: 100,
      required: true,
      inMany: true,
      width: 62,
      column: "label",
    },
    {
      id: "type",
      column: "type_id",
      type: "lov",
      label: "Type",
      lovTable: "evol_group_type",
      list: [
        { id: 1, text: "Panel" },
        { id: 2, text: "Collapsible" },
      ],
      width: 38,
      inMany: true,
    },
    {
      id: "object",
      label: "Object",
      type: "lov",
      object: "object",
      required: true,
      inMany: true,
      noCharts: true,
      width: 32,
      column: "object_id",
      lovTable: "evol_object",
      lovColumn: "title",
      width: 62,
      deleteTrigger: true,
    },
    {
      id: "fields",
      label: "Fields",
      type: "json",
      column: "fields",
      required: true,
      width: 100,
      height: 5,
    },
    {
      id: "position",
      column: "position",
      label: "Position",
      help: "Order of the field",
      type: "integer",
      maxLength: 3,
      width: 50,
    },
    {
      id: "width",
      column: "width",
      label: "Width",
      defaultValue: 100,
      help: "Relative width of the group (in percentage of the screen)",
      type: "integer",
      format: "0 '%'",
      maxLength: 3,
      width: 50,
    },
    {
      id: "css",
      column: "css",
      label: "CSS",
      help: "Stylesheet class name for the group.",
      type: "text",
      maxLength: 20,
      width: 100,
    },
    {
      id: "header",
      column: "header",
      label: "Header",
      type: "textmultiline",
      maxLength: 500,
      width: 100,
      height: 4,
      help: "Introduction text displayed at the top of the group.",
    },
    {
      id: "footer",
      column: "footer",
      label: "Footer",
      type: "textmultiline",
      maxLength: 500,
      width: 100,
      height: 4,
      help: "Footer text displayed below the group.",
    },
    {
      id: "description",
      column: "description",
      label: "Description",
      type: "textmultiline",
      maxLength: 500,
      width: 100,
      height: 3,
    },
  ],
  groups: [
    {
      label: "Identity",
      width: 62,
      fields: ["label", "gid", "type", "object", "fields", "description"],
    },
    {
      label: "Layout",
      width: 38,
      fields: ["position", "width", "css", "header", "footer"],
    },
  ],
};
