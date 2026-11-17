# Evolutility-Models &middot; [![GitHub license](https://img.shields.io/github/license/evoluteur/evolutility-models)](https://github.com/evoluteur/evolutility-models/blob/main/LICENSE.md) [![npm version](https://img.shields.io/npm/v/evolutility-models)](https://www.npmjs.com/package/evolutility-models)

Evolutility-Models provides a metamodel, sample models, mock data, some scripts, and a process, to build applications with models rather than code.

Write simple models, and use them to generate your Database, your REST endpoints, and your Web UI automatically.

### Contents

[Metamodel](#MetaModel)

- [Objects](#Object)
- [Fields](#Field)
- [Field Groups](#Group)
- [Nested Collections](#Collection)

[Models](#Models)

- [Demo Apps](#Demos)
- [Test](#Test)

[Scripts](#Scripts)

- [Generate SQL script for Database](#ScriptsDB)

[License](#License)

<a name="MetaModel"></a>

## Metamodel

The metamodel is the structure of the model (the model of models). I think about it as the language for making models.

- [Objects](#Object)
- [Fields](#Field)
- [Field Groups](#Group)
- [Nested Collections](#Collection)

Models describe [objects](#Object) with [fields](#Field), [Field groups](#Group), and [collections](#Collection) (nested lists of objects).

For every object, all UI views (List, Cards, Edit, Charts...) use the same model as the single source of truth.

All Fields are present in the Edit and Browse views. Fields can be flagged as "inMany" to be included in List, Cards, and Charts views.

```typescript
export default {
  id: "todo",
  label: "To-Do List",
  name: "task",
  namePlural: "tasks",
  icon: "todo.png",
  titleField: "title",
  table: "task",
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
      maxLength: 255
    },
    {
      id: "duedate",
      type: "date",
      label: "Due Date",
      width: 38,
      inMany: true,
      column: "due_date"
    },
    ...
  ]
}

```

<a name="Object"></a>

### Object

| Property        | Meaning                                                      | UI  | BE  |
| --------------- | -------------------------------------------------------------------------------------------------------------------------- | --- | --- |
| id              | Unique key to identify the entity (used as API parameter).   | X   | X   |
| icon            | Icon file name for the entity (example: "cube.png").         | X   |     |
| world           | Application the object belongs to (e.g. "organizer").        | X   | X   |
| name            | Object name (singular) (e.g.: "contact").                    | X   |     |
| namePlural      | Object name (plural) (e.g.: "contacts").                     | X   |     |
| title           | Application name (e.g.: "Addressbook").                      | X   | X   |
| fields          | Array of [fields](#Field).                                   | X   | X   |
| groups          | Array of [groups](#Group). If not provided a single group will be used.                                                    | X   |     |
| collections     | Array of [collections](#Collection) (displayed as Lists).    | X   | X   |
| titleField      | Id of the field whose value is used as record title. titleField can also be a function.                                    | X   | X   |
| titleFunction   | Function to calculate the record title based on its data. Example: titleFunction = (d) => d.firstname + " " + d.lastname;       | X   | X   |
| table           | Driving database table name (there are secondary tables for fields of type "lov").                                         |     | X   |
| pKey            | Name of the Primary key column (single column of type serial). Defaults to "id". In the data the key is always called "id". |     | X   |
| defaultViewMany | Default view for Many records (possible values: list, cards, charts).                                                      | X   |     |
| defaultViewOne  | Default view for One record (possible values browse, edit).  | X   |     |
| noStats         | Do not provide Stats view for this objct.     | X   | X   |

UI: The property is used in UI models.
BE: The property is used in the Backend models.


<a name="Field"></a>

### Field

For the backend, fields are columns in a database table.
For the frontend, fields are textboxes, checkboxes, datepickers... in Edit view, and they are columns in List view.

| Property             | Meaning                          | UI  | BE  |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --- | --- |
| id                   | Unique key for the field (can be the same as column but doesn't have to be).             | X   | X   |
| type                 | Field type to show in the UI. Possible field types: <ul><li>boolean (yes/no)</li><li>date</li><li>datetime</li><li>decimal</li><li>document</li><li>email</li><li>image</li><li>integer</li><li>json</li><li>list (multiselect)</li><li>lov (list of values)</li><li>money</li><li>text</li><li>textmultiline</li><li>time</li><li>url</li></ul> | X   | X   |
| label                | Field description (displayed with an asterisk for required fields).                  | X   |     |
| labelShort           | Optional shorter version of the labels (used in List and Cards views).                   | X   |     |
| labelEdit            | Optional alternative label used in Edit view (instead of label).                         | X   |     |
| required             | Determines if the field is required for saving.                                          | X   | X   |
| readOnly             | Field value cannot be changed.   | X   | X   |
| defaultValue         | Default field value for new records.                                                     | X   | X   |
| hideIfEmpty          | Hide field when empty in Browse view.                                                     | X   |     |
| dependantField       | ID of an optional dependent field. Used when selecting in one list changes the content of the dependent list (among 2 fields of type "lov").                                                     | X   | X   |
| max, min             | Maximum/Minimum value allowed (only applies to numeric fields).                          | X   | X   |
| maxLength, minLength | Maximum/Minimum length allowed (only applies to text fields).                            | X   | X   |
| regExp               | Regular expression used to validate the field value.                                     | X   | X   |
| inMany               | Determines if the field is present (by default) in lists of records.                     | X   | X   |
| inSearch             | Determines if the field is used in text searches.                                         |     | X   |
| height               | For fields of type "textmultiline", number of lines used in the field (in Browse and Edit views).                                                      | X   |     |
| width                | Field width in Browse and Edit views (in percent of parent width). Default: 100%         | X   |     |
| help                 | Optional help on the field.      | X   |     |
| chartType            | Default charts type used for the field ("Bars", "Pie", or "Table"). The default value is "Bars".                                                       | X   |     |
| search               | Include field in search.         | X   | X   |
| noFilters             | Exclude field from filters (only applies to fields of type integer, decimal, money, boolean, list of values which are "chartable").                    | X   | X   |
| noCharts             | Exclude field from charts (only applies to fields of type integer, decimal, money, boolean, list of values which are "chartable").                     | X   | X   |
| noStats              | Exclude field from stats.     | X   | X   |
| column               | Database column name for the field.                                                      |     | X   |
| pii                  | Flag for personally identifiable information.                                                      |     | X   |
| lovTable             | Table to join to for field value (only for fields of "lov" type).                        |     | X   |
| lovColumn            | Column name (in the lovTable) for field value (only for fields of "lov" type).           |     | X   |
| lovKey            | Primary key column name (in the lovTable) (default to "id").           |     | X   |
| lovIcon              | LOV items have icons (only for fields of "lov" type).                                    | X   | X   |
| deleteTrigger        | Deleting records in the lovTable will trigger a cascade delete (this property is only used for creating the database).                                 |     | X   |
| object               | Model id for the object to link to (only for fields of "lov" type).                      | X   | X   |
| unique               | Field value must be unique.                      | X   | X   |

UI: The property is used in UI models.
BE: The property is used in the Backend models.

<a name="Group"></a>

### Field Group

Field Groups are used to visually group fields on the page for browsing or editing.

Field Groups are only used in UI models and are optional. By default a single group holds all fields.

| Property | Meaning                             | UI  | BE  |
| -------- | ------------------------------------------------------------------------------------------------- | --- | --- |
| id       | Unique key for the group. It is optional.     | X   |     |
| type     | Type of group. Only "panel" is currently implemented ("tab" and "accordion" will be added later). | X   |     |
| label    | Group title as displayed to the user.   | X   |     |
| fields   | Array of [field](#Field) ids.     | X   |     |
| width    | Width (in % of the container total width).   | X   |     |
| help     | Optional help tooltip text.| X  ||
| header   | Text to be displayed at the top of the group (just below the group title).      | X   |     |
| footer   | Text to be displayed below the group.      | X   |     |

UI: The property is used in UI models.
BE: The property is used in the Backend models.

<a name="Collection"></a>

### Collection

Multiple Master-Details can be specified with collections.

| Property | Meaning                                                     | UI  | BE  |
| -------- | ------------------------------------------------------------------------------------------------------------------------- | --- | --- |
| id       | Unique key for the collection.      | X   | X   |
| title    | Collection title.       | X   |     |
| table    | Table to query for the details list.       |     | X   |
| column   | Column in the details table to match against object's id.   |     | X   |
| object   | Model id for the object to link to. When specified, "column" and "table" can be omitted.                                  | X   | X   |
| hideIfEmpty  | Hide Collection when it is empty in Edit view (always hidden when empty in Browse view).    |X||
| order    | Direction to order by "asc" or "desc".      |  | X   |
| orderBy  | SQL order by clause, e.g. { orderBy: "id" }.      |     | X   |
| fields   | Array of fields. Collections are not editable so their fields do not need as many properties as the main object's fields. | X   | X   |
| help     | Optional help tooltip text.| X  ||
| header   | Text to be displayed at the top of the collection.     | X   |     |
| footer   | Text to be displayed below the collection.     | X   |     |

UI: The property is used in UI models.
BE: The property is used in the Backend models.

<a name="Models"></a>

## Sample models

<a name="Demos"></a>
### Demo Apps

Models are descriptions of objects and their properties/fields, field groups, and sometimes nested-collections.

#### Organizer

- [To-do list](https://github.com/evoluteur/evolutility-models/blob/main/models/organizer/todo.ts)
- [Address book](https://github.com/evoluteur/evolutility-models/blob/main/models/organizer/contact.ts)
- [Restaurants list](https://github.com/evoluteur/evolutility-models/blob/main/models/organizer/restaurant.ts)
- [Graphic novels](https://github.com/evoluteur/evolutility-models/blob/main/models/organizer/comics.ts)
- [Wine cellar](https://github.com/evoluteur/evolutility-models/blob/main/models/organizer/winecellar.ts)

#### Music

- [Artists](https://github.com/evoluteur/evolutility-models/blob/main/models/music/artist.ts)
- [Albums](https://github.com/evoluteur/evolutility-models/blob/main/models/music/album.ts)
- [Tracks](https://github.com/evoluteur/evolutility-models/blob/main/models/music/track.ts)

<a name="Test"></a>
#### Test

- [Test model](https://github.com/evoluteur/evolutility-models/blob/main/models/tests/test.ts) with fields of all possible types.


<a name="Scripts"></a>

## Scripts

<a name="ScriptsDB"></a>

Evolutility-Models provides scripts (TypeScript in NodeJS) to generate the SQL for the database: the tables and data, and the models themselves. [Evolutility-Server-Node](https://github.com/evoluteur/evolutility-server-node) and [Evolutility-UI-React](https://github.com/evoluteur/evolutility-ui-react) get the models from the database.

### Database

Generate SQL script to create a Postgres DB with tables for all models.

In the command line type the following:

```bash
# Install dependencies
npm install

# Create SQL for sample database w/ demo tables
npm run codegen:db

```

The SQL scripts for creating the database and populating it are generated in the "/dist/db/sql/" directory

- `001_create_db_{datetime}.sql` to create the database
- `002_seed_data_{datetime}.sql` to populate the database with seed data
- `003_create_models_{datetime}.sql` to create the tables "evol_model" (one JSON document per model) and "evol_model_history" (every saved version of the models)
- `004_seed_models_{datetime}.sql` to store the models in the database (full models with UI and DB properties)

Storing models in the database lets [Evolutility-Server-Node](https://github.com/evoluteur/evolutility-server-node) serve them and lets you edit them in the app.

The models script can run again after changing models: models that changed get a new version (the previous one is kept in the history), and the others are left alone. A model edited in the app is replaced by the version from the files.

To only generate the SQL for the models:

```bash
npm run codegen:db:models
```

Note: Models are stored in full (UI and DB properties). The UI and the back-end ignore what they do not need.

<a name="License"></a>

## License

Evolutility-Models is released under the [MIT license](http://github.com/evoluteur/evolutility-models/blob/main/LICENSE.md).

Copyright (c) 2026 [Olivier Giulieri](https://evoluteur.github.io/).
