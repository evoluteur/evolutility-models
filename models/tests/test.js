const flavors = [
    {id: 1, text: "Vanilla"},
    {id: 2, text: "Chocolate"},
    {id: 3, text: "Strawberry"},
    {id: 4, text: "Green Tea"},
    {id: 5, text: "Lemon Cookie"},
];

module.exports = {
    id: "test",
    table: 'z_test',
    label: "Test List",
    name: "test",
    namePlural: "tests",
    icon: "test.gif",
    titleField: "name",
  
    fields:[
        {
            id: "name",
            column: "name",
            label: "Title",
            type: "text",
            width: 100,
            required: true,
            inMany: true
        },
        {
            id: "text",
            column: "f_text",
            label: "Text",
            type: "text",
            width: 50,
            inMany: true
        },
        {
            id: "textmultiline", 
            column: "f_textmultiline",
            type: "textmultiline", 
            label: "Text multiline", 
            height: 3,
            width: 50,
        },
        {
            id: "lov", 
            type: "lov", 
            column: "f_lov",
            label: "List of Values", 
            width: 100,  
            list: flavors,
			lovtable: 'z_test_flavor',
            required: true,
            inMany: true,
        },
        {
            id: "lovlc", type: "lov", 
            column: "f_lovlc",
            label: "Lemon Cookie", 
            width: 100,
            list: flavors,
            help: "List of Values with \"Lemon Cookie\" as default value.",
			lovtable: 'z_test_flavor',
            defaultValue: 5
        },
        {
            id: "date", 
            type: "date", 
            column: "f_date",
            label: "Date", 
            width: 100,
            inMany: true,
            required: true,
        },
        {
            id: "datetime", 
            type: "datetime", 
            column: "f_datetime",
            label: "Date-Time", 
            width: 100,
			help: 'Date and time as a single field (not implemented yet).',
            inMany: true
        },
        {
            id: "time", 
            type: "time", 
            column: "f_time",
            label: "Time", 
			help: 'Time field (not implemented yet).',
            width: 100,
            inMany: true
        },
        {
            id: "integer", 
            type: "integer", 
            column: "f_integer",
            label: "Integer", 
            width: 100,
            required: true,
            inMany: true
        },
        {
            id: "decimal", 
            type: "decimal", 
            column: "f_decimal",
            label: "Decimal", 
            width: 100,
        },
        {
            id: "money", 
            type: "money", 
            column: "f_money",
            label: "Money", 
            width: 100,
        },
        {
            id: "boolean", 
            type: "boolean", 
            column: "f_boolean",
            label: "Boolean", 
            width: 100,
            inMany: true
        },
        {
            id: "email", 
            type: "email", 
            column: "f_email",
            label: "email", 
            width: 50,
            inMany: true
        },
        {
            id: "url", 
            type: "url", 
            column: "f_url",
            label: "url", 
            width: 50,
        },
        {
            id: "document", 
            type: "document", 
            column: "f_document",
            label: "Document", 
            width: 100,
        },
        {
            id: "image", 
            type: "image", 
            column: "f_image",
            label: "Image", 
            width: 100,
            inMany: true
        },
      ],

    groups: [
      {
        id:"ptxt", type:"panel", 
        label: "Text", width: 62,
        fields: ["name", "text", "textmultiline", "email", "url", ]
      },
      {
        id:"pnum", type:"panel", 
        label: "Numbers", width: 38,
        fields: ["integer", "decimal", "money", "boolean", ]
      },
      {
        id:"pdate", type:"panel", 
        label: "Date & Time", width: 31,
        fields: ["date", "datetime", "time"]
      },
      {
        id:"plist", type:"panel", 
        label: "List of Values", width: 31,
        fields: ["lov", "lovlc"]
      },
      {
        id:"ppix", type:"panel", 
        label: "Image & Document", width: 38,
        fields: ["image","document"]
      }
    ]

  }
  
  