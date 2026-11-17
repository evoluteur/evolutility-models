/*!
 *  Mappings for models, ui-models, and db-models.
 *
 *  https://github.com/evoluteur/evolutility-models
 *  (c) 2026 Olivier Giulieri
 */

import {
  FieldType,
  type Field,
  type FieldBase,
  type FieldUI,
  type FieldDB,
  type Model,
  type ModelUI,
  type ModelDB,
  type Collection,
  type CollectionUI,
  type CollectionDB,
} from "./types.ts";

const gField = (f: Field): FieldBase => ({
  id: f.id,
  type: f.type,
  label: f.label,
  object: f.object || f.entity,
  required: f.required,
  readOnly: f.readOnly,
  noCharts: f.noCharts,
  noStats: f.noStats,
  list: f.list,
  lovIcon: f.lovIcon,
  max: f.max,
  min: f.min,
  maxLength: f.maxLength,
  minLength: f.minLength,
  defaultValue: f.defaultValue,
  inMany: f.inMany,
});

const uiField = (f: Field): FieldUI => ({
  ...gField(f),
  labelShort: f.labelShort,
  width: f.width,
  height: f.height,
  chartType: f.chartType,
  help: f.help,
});

const dbField = (f: Field): FieldDB => {
  const fld: FieldDB = {
    ...gField(f),
    column: f.column || f.dbcolumn || f.id,
    inSearch: f.inSearch,
  };
  if (f.type === FieldType.lov) {
    fld.lovTable = f.lovTable || f.dbtablelov;
    fld.lovColumn = f.lovColumn || f.dbcolumnreadlov;
    fld.lovIcon = f.lovIcon ?? false;
  }
  if (f.deleteTrigger) fld.deleteTrigger = true;
  return fld;
};

const uiCollec = (collec: Collection): CollectionUI => ({
  id: collec.id,
  title: collec.title || collec.label,
  object: collec.object || collec.entity,
  icon: collec.icon,
  fields: collec.fields as FieldUI[],
});

const dbCollec = (collec: Collection): CollectionDB => ({
  id: collec.id,
  table: collec.table,
  column: collec.column,
  object: collec.object || collec.entity,
  orderBy: collec.orderBy,
  fields: collec.fields as FieldDB[],
});

export const uiModel = (m: Model): ModelUI => {
  const m1: ModelUI = {
    id: m.id,
    oid: m.oid,
    title: m.title || m.label,
    world: m.world,
    name: m.name,
    namePlural: m.namePlural,
    icon: m.icon,
    active: m.active,
    position: m.position,
    defaultViewMany: m.defaultViewMany || "list",
    defaultViewOne: m.defaultViewOne || "browse",
    titleField: m.titleField,
    titleFunction: m.titleFunction || null,
    fields: m.fields.filter((f) => !f.onlyDB).map(uiField),
    groups: m.groups,
    collections: m.collections ? m.collections.map(uiCollec) : [],
  };
  if (m.noCharts) m1.noCharts = true;
  if (m.noStats) m1.noStats = true;
  return m1;
};

export const dbModel = (m: Model): ModelDB => {
  const m1: ModelDB = {
    id: m.id,
    title: m.title || m.label,
    world: m.world,
    name: m.name,
    namePlural: m.namePlural,
    pKey: m.pKey || "id",
    table: m.table,
    active: m.active,
    titleField: m.titleField,
    fields: m.fields.filter((f) => !f.onlyUI).map(dbField),
    collections: m.collections ? m.collections.map(dbCollec) : [],
  };
  if (m.noCharts) m1.noCharts = true;
  if (m.noStats) m1.noStats = true;
  return m1;
};

// - functions can't be stored in JSON: a simple title function becomes a template
// - (d) => d.firstname + " " + d?.lastname  =>  "{firstname} {lastname}"
// - A guard like (d) => (d ? ... : "") is ignored.
export const fnToTemplate = (fn: unknown): string | undefined => {
  if (typeof fn !== "function") return typeof fn === "string" ? fn : undefined;
  const src = fn.toString();
  let body = src.slice(src.indexOf("=>") + 2).trim();
  if (body.startsWith("(") && body.endsWith(")")) body = body.slice(1, -1).trim();
  const guard = body.match(/^\w+\s*\?(.+):\s*(""|''|``)$/s);
  if (guard) body = guard[1].trim();
  let out = "";
  for (const part of body.split("+").map((p) => p.trim())) {
    const str = part.match(/^(["'`])(.*)\1$/);
    const prop = part.match(/^\w+\??\.([\w?.]+)$/);
    if (str) out += str[2];
    else if (prop) out += "{" + prop[1].replace(/\?/g, "") + "}";
    else return undefined;
  }
  return out;
};

const isLovType = (f: Field) =>
  f.type === FieldType.lov || f.type === FieldType.list;

// - Full model (UI + DB props) as stored in the database (table "evol_model"):
// - JSON only (no functions), w/ the defaults made explicit (table, pKey,
// - columns, lov tables) and the legacy prop names replaced.
export const storedModel = (
  m: Model,
  allModels: Record<string, Model> = {},
): Model => {
  const table = m.table || m.id;
  const fields: Field[] = m.fields.map((f) => {
    const {
      entity,
      dbcolumn,
      dbtablelov,
      dbcolumnreadlov,
      t2: _t2,
      ...fld
    } = f;
    const field: Field = { ...fld };
    const object = f.object || entity;
    if (object) field.object = object;
    if (!f.onlyUI && f.type !== FieldType.formula) {
      field.column = f.column || dbcolumn || f.id;
    }
    if (isLovType(f) && !f.onlyUI) {
      const lovTable = f.lovTable || dbtablelov;
      const om = object ? allModels[object] : undefined;
      field.lovTable =
        lovTable || (object ? om && (om.table || om.id) : `${table}_${f.id}`);
      const lovColumn = f.lovColumn || dbcolumnreadlov;
      if (lovColumn) field.lovColumn = lovColumn;
    }
    return field;
  });
  const {
    label,
    titleFunction,
    fieldsH: _fh,
    collecsH: _ch,
    schemaTable: _st,
    _prepared,
    ...props
  } = m as Model & Record<string, unknown>;
  const stored: Model = {
    ...props,
    title: m.title || label,
    table,
    pKey: m.pKey || "id",
    fields,
  } as Model;
  // - in the UI, the label of a lov field "x" is "x.name" (not "x_txt")
  const lovIds = new Set(fields.filter(isLovType).map((f) => f.id));
  const tf = fnToTemplate(titleFunction)?.replace(
    /\{(\w+)_txt\}/g,
    (match, id: string) => (lovIds.has(id) ? `{${id}.name}` : match),
  );
  if (tf) stored.titleFunction = tf;
  else if (titleFunction) {
    console.warn(`"${m.id}": titleFunction can't be stored as JSON, skipped.`);
  }
  if (m.collections) {
    stored.collections = m.collections.map(({ entity, label: cl, ...c }) => ({
      ...c,
      object: c.object || entity,
      title: c.title || cl,
    }));
  }
  // - drop undefined values (and any function left)
  return JSON.parse(JSON.stringify(stored));
};
