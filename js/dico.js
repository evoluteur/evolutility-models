/*!
Evolutility-UI-React
https://github.com/evoluteur/evolutility-ui-react
(c) 2022 Olivier Giulieri
*/

// evolutility :: utils/dico.js

// Helpers for models

import format from "./format";

// - Field Types
var ft = {
  text: "text",
  textml: "textmultiline",
  bool: "boolean",
  int: "integer",
  dec: "decimal",
  money: "money",
  date: "date",
  datetime: "datetime",
  time: "time",
  lov: "lov",
  list: "list", // many values for one field (behave like tags - return an array of strings)
  html: "html",
  formula: "formula", // soon to be a field attribute rather than a field type
  email: "email",
  image: "image",
  doc: "document",
  //geoloc: 'geolocation',
  url: "url",
  color: "color",
  hidden: "hidden",
  json: "json",
  //rating: 'rating',
  //widget: 'widget'
};

export const fieldTypes = ft;

export const fieldIsNumber = (f) =>
  f.type === ft.int || f.type === ft.dec || f.type === ft.money;

export const fieldIsDateOrTime = (f) =>
  f.type === ft.date || f.type === ft.datetime || f.type === ft.time;

export const fieldIsNumeric = (f) => fieldIsNumber(f) || fieldIsDateOrTime(f);

export const fieldInCharts = (f) => fieldChartable(f) && !f.noCharts;

export const fieldChartable = (f) =>
  f.type === ft.lov ||
  f.type === ft.list ||
  f.type === ft.bool ||
  fieldIsNumber(f);

export function hById(arr) {
  var objH = {};
  if (arr) {
    arr.forEach(function (o) {
      objH[o.id] = o;
    });
  }
  return objH;
}

function getFields(model) {
  const fs = [];

  function collateFields(te) {
    if (te && te.elements && te.elements.length > 0) {
      te.elements.forEach(function (te) {
        if (te.type !== "panel-list") {
          collateFields(te);
        }
      });
    } else {
      if (te.type && te.type !== "formula") {
        fs.push(te);
      }
    }
  }

  if (model) {
    if (model.fields) {
      return model.fields;
    } else {
      collateFields(model);
      model.fields = fs;
      return fs;
    }
  }
  return [];
}

export function prepModel(m) {
  if (m) {
    if (!m._prepared) {
      if (!m.fields) {
        m.fields = getFields(m);
      }
      if (!m.fieldsH) {
        m.fieldsH = hById(m.fields);
      }
      if (!m.titleField) {
        m.titleField = m.fields[0].id;
      }
      if (!m.label) {
        m.label = m.title || format.capitalize(m.namePlural || m.name);
      }
      if (!m.titleField) {
        m.titleField = m.fields[0];
      }
      m._prepared = true;
    }
    return m;
  }
  return null;
}

export function prepModelCollecs(models, m) {
  if (m) {
    if (!m.fields) {
      m.fields = getFields(m);
    }
    if (!m.fieldsH) {
      m.fieldsH = hById(m.fields);
    }
    if (!m.titleField) {
      m.titleField = m.fields[0].id;
    }
    if (!m.label) {
      m.label = m.title || m.namePlural || m.name;
    }
    if (!m.titleField) {
      m.titleField = m.fields[0];
    }
    return m;
  }
  return null;
}

export const isFieldMany = (f) => f.inList || f.inMany;

export const fieldIsText = (f) =>
  [ft.text, ft.textml, ft.url, ft.html, ft.email].indexOf(f.type) > -1;

export const fieldId2Field = (fieldIds, fieldsH) =>
  fieldIds ? fieldIds.map((id) => fieldsH[id] || null) : null;
