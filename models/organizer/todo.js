/*
  Evolutility Model for To-Do List
*/

module.exports = {
  id: "todo",
  oid: 1,
  world: "organizer",
  active: true,
  position: 1,
  label: "To-Do List",
  name: "task",
  namePlural: "tasks",
  icon: "todo.png",
  titleField: "title",
  table: "task",
  noStats: true,
  fields: [
    {
      id: "title",
      label: "Title",
      type: "text",
      width: 100,
      required: true,
      inMany: true,
      inSearch: true,
      column: "title",
      maxLength: 255,
      inSearch: true,
    },
    {
      id: "duedate",
      type: "date",
      label: "Due date",
      width: 38,
      inMany: true,
      column: "duedate",
    },
    {
      id: "category",
      type: "lov",
      label: "Category",
      list: [
        {
          id: 1,
          text: "Personal",
        },
        {
          id: 2,
          text: "Work",
        },
        {
          id: 3,
          text: "Projects",
        },
        {
          id: 4,
          text: "Goals",
        },
        {
          id: 5,
          text: "Fun",
        },
        {
          id: 6,
          text: "Others",
        },
        {
          id: 7,
          text: "Misc.",
        },
      ],
      width: 62,
      inMany: true,
      column: "category_id",
      lovTable: "task_category",
    },
    {
      id: "priority",
      type: "lov",
      label: "Priority",
      width: 100,
      inMany: true,
      list: [
        {
          id: 1,
          text: "1 - ASAP",
        },
        {
          id: 2,
          text: "2 - Urgent",
        },
        {
          id: 3,
          text: "3 - Important",
        },
        {
          id: 4,
          text: "4 - Medium",
        },
        {
          id: 5,
          text: "5 - Low",
        },
      ],
      defaultValue: 4,
      column: "priority_id",
      required: true,
      lovTable: "task_priority",
    },
    {
      id: "complete",
      type: "boolean",
      label: "Complete",
      width: 100,
      inMany: true,
      column: "complete",
    },
    {
      id: "description",
      type: "textmultiline",
      label: "Description",
      height: 5,
      column: "description",
      maxLength: 1000,
      inMany: false,
      inSearch: true,
      inSearch: true,
    },
  ],
  groups: [
    {
      id: "p1",
      type: "panel",
      label: "Task",
      width: 62,
      fields: ["title", "duedate", "category"],
    },
    {
      id: "p2",
      type: "panel",
      label: "Status",
      width: 38,
      fields: ["priority", "complete"],
    },
    {
      id: "p3",
      type: "panel",
      label: "Task description",
      width: 100,
      fields: ["description"],
    },
  ],
};
