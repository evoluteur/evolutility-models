
# Evolutility-Models

With Evolutility, models are DRY (Don't Repeat Yourself) descriptions of applications. These models contain all the information necessary for the backend (database tables and columns, validation...) and the UI (views, fields, validation...).

Cool things to do with models:

- Create a database and automatically provide REST or GraphQL endpoints using [Evolutility-Server-Node](https://github.com/evoluteur/evolutility-server-node).

- Run a Web UI with [Evolutility-UI-React](https://github.com/evoluteur/evolutility-ui-react).


## Sample models

#### Personal Information Manager (PIM)

- [To-do list](https://github.com/evoluteur/evolutility-models/blob/master/models/pim/todo.js)
- [Address book](https://github.com/evoluteur/evolutility-models/blob/master/models/pim/contact.js)
- [Restaurants list](https://github.com/evoluteur/evolutility-models/blob/master/models/pim/restaurant.js)
- [Graphic novels](https://github.com/evoluteur/evolutility-models/blob/master/models/pim/comics.js)
- [Wine cellar](https://github.com/evoluteur/evolutility-models/blob/master/models/pim/winecellar.js)

#### Music

- [Artists](https://github.com/evoluteur/evolutility-models/blob/master/models/music/artist.js)
- [Albums](https://github.com/evoluteur/evolutility-models/blob/master/models/music/album.js)
- [Tracks](https://github.com/evoluteur/evolutility-models/blob/master/models/music/track.js)

#### Test

- [Test model](https://github.com/evoluteur/evolutility-models/blob/master/models/tests/test.js) with fields of all possible types.


#### Models of models


If we store the models in the database (instead of JSON files), we can use the application to modify the application.

Still under construction. 

- [Objects](https://github.com/evoluteur/evolutility-models/blob/master/models/designer/object.js)
- [Fields](https://github.com/evoluteur/evolutility-models/blob/master/models/designer/field.js)
- [Worlds](https://github.com/evoluteur/evolutility-models/blob/master/models/designer/world.js)

TODO: field groups and collections.

## Scripts

This project provides scripts to make UI-models or DB-models from models.

Make UI models (with only UI metadata) for [Evolutility-UI-React](https://github.com/evoluteur/evolutility-ui-react):

```bash
node js/models-ui.js

```


Make back-end models (with only back-end metadata) for [Evolutility-Server-Node](https://github.com/evoluteur/evolutility-server-node):

```bash
node js/models-db.js

``` 

For both:

```bash
node js/models-db.js && node js/models-ui.js

``` 


Generated models are saved in the directories "models-ui" and "models-db". The list of "full" models to generate from is specified in "/models/all_models.js".

Note: The full models can be used as they are by both UI and back-end (which ignore what they do not need in the models).
 
## Metamodel

The metamodel is the structure of the model (the model of models). 
I think about it as the vocabulary for making models.

Models describe [objects](#Object) with [fields](#Field), [groups](#Group) of fields, and [collections](#Collection) (nested lists of objects). 
For any object, all UI views (List, Cards, Edit, Charts...) share the same model. 
All Fields are present in the Edit and Browse views. Fields can be flagged as "inMany" to be included in List, Cards, and Charts views.


```javascript
module.exports = {
	"id": "todo",
	"label": "To-Do List",
	"name": "task",
	"namePlural": "tasks",
	"icon": "todo.gif",
	"titleField": "title",
	"table": "task",
	"searchFields": [
		"title",
		"description"
	],
	"fields": [
		{
			"id": "title",
			"label": "Title",
			"type": "text",
			"width": 100,
			"required": true,
			"inMany": true,
			"column": "title",
			"maxLength": 255
		},
		{
			"id": "duedate",
			"type": "date",
			"label": "Due Date",
			"width": 38,
			"inMany": true,
			"column": "due_date"
		},
		...
	]
}

```



<a name="Object"></a>
### Object

| Property     | Meaning                                 | UI | DB |
|--------------|-----------------------------------------|----|----|
| id           | Unique key to identify the entity (used as API parameter). |X|X|
| icon         | Icon file name for the entity (example: "cube.gif"). |X||
| name         | Object name (singular) (example: "contact").   |X| |
| namePlural   | Object name (plural) (example: "contacts").     |X| |
| title        | Application name (example: "Addressbook").         |X| |
| fields       | Array of [fields](#Field).           |X|X|
| groups       | Array of [groups](#Group). If not provided a single group will be used.   |X| |
| collections  | Array of [collections](#Collection) (displayed as Lists).      |X|X|
| titleField   | Id of the field which value is used as record title. titleField can also be a function. |X|X| 
| table        | Driving database table name (there are secondary tables for fields of type "lov").     | |X| 
| pKey         | Name of the Primary key column (single column of type serial). Default to "id". In the data the key is always called "id". | |X|
| searchFields | Array of field ids for fields used to perform searches (default to fields of text value which are included in the List view.  | |X|
| defaultViewMany| Default view for Many records (possible values: list, cards, charts).  |X| |
| defaultViewOne| Default view for One record (possible values browse, edit).    |X| | 

X: Indicate if the property is used in UI/DB models.
 
<a name="Field"></a>
### Field

For the backend, fields are columns in a database table. 
For the frontend, fields are textboxes, checkboxes, datepickers... in Edit view, and they are columns in List view.

| Property     | Meaning                               | UI | DB |
|--------------|---------------------------------------|----|----|
| id           | Unique key for the field (can be the same as column but doesn't have to be). |X|X|
| type         | Field type to show in the UI. Possible field types: <ul><li>boolean (yes/no)</li><li>date</li><li>datetime</li><li>decimal</li><li>document</li><li>email</li><li>image</li><li>integer</li><li>lov (list of values)</li><li>money</li><li>text</li><li>textmultiline</li><li>time</li><li>url</li></ul> |X|X|
| label        | Field description (displayed with an asterisk for required fields).      |X||
| labelShort   | Optional shorter version of the labels (used in List and Cards views). |X||
| required     | Determines if the field is required for saving.      |X|X|
| readOnly     | Field value cannot be changed.   |X|X|
| defaultValue | Default field value for new records.                 |X|X|
| max, min     | Maximum/Minimum value allowed (only applies to numeric fields).      |X|X|
| maxLength, minLength | Maximum/Minimum length allowed (only applies to text fields).      |X|X|
| inMany       | Determines if the field is present (by default) in lists of records. |X|X|
| height       | For fields of type "textmultiline", number of lines used in the field (in Browse and Edit views). |X||
| width        | Field width in Browse and Edit views (in percent of parent width). Default: 100%  |X||
| help         | Optional help on the field. |X||
| chartType    | Default charts type used for the field ("Bars", "Pie", or "Table"). The default value is "Bars".  |X||
| noCharts     | Prevent the field to have a charts (only necessary for fields of type integer, decimal, money, boolean, list of values which are "chartable"). |X|X|
| column       | Database column name for the field    ||X|
| lovTable     | Table to join to for field value (only for fields of "lov" type). ||X|
| lovColumn    | Column name (in the lovTable) for field value (only for fields of "lov" type). ||X|
| lovIcon      | LOV items have icons (only for fields of "lov" type). |X|X|
| deleteTrigger | Deleting records in the lovTable will trigger a cascade delete (this property is only used for creating the database). | |X|
| object       | Model id for the object to link to (only for fields of "lov" type).       |X|X|
| onlyUI | The field will  only be present in the UI model. |||
| onlyDB | The field will  only be present in the DB model. |||

<a name="Group"></a>
### Group

Groups are used to visually group fields on the page for browsing or editing.

Groups are only used in UI models and are optional. By default a single group holds all fields.

| Property     | Meaning                               | UI | DB |
|--------------|---------------------------------------|----|----|
| id           | Unique key for the group. It is optional.  |X||
| type         | Type of group. Only "panel" is currently implemented ("tab" and "accordeon" will be added later). |X||
| label        | Group title as displayed to the user.      |X||
| fields       | Array of [field](#Field) ids.              |X||
| width        | Width (in % of the container total width). |X||
| header       | Text to be displayed at the top of the group (just below the group title).|X||
| footer       | Text to be displayed at the bottom of the group.    |X||


<a name="Collection"></a>
### Collection

Multiple Master-Details can be specified with collections. 

| Property     | Meaning                               | UI | DB |
|--------------|---------------------------------------|----|----|
| id           | Unique key for the collection.        |X|X|
| title        | Collection title.                     |X||
| table        | Table to query for the details list.  ||X|
| column       | Column in the details table to match against object's id. ||X|
| object       | Model id for the object to link to.   |X|X|
| order        | "asc/desc" for sorting by the first field in list of fields.     ||X|
| fields       | Array of fields. Collections are not editable so their fields do not need as many properties as the main object's fields.   |X|X|


<a name="License"></a>
## License

Copyright (c) 2019 [Olivier Giulieri](https://evoluteur.github.io/).

Evolutility-Models is released under the [MIT license](http://github.com/evoluteur/evolutility-models/blob/master/LICENSE.md).
