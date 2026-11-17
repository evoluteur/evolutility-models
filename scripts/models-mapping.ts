/*!
 *  Mapping of models to the models stored in the database.
 *
 *  https://github.com/evoluteur/evolutility-models
 *  (c) 2026 Olivier Giulieri
 */

import { FieldType, type Field, type Model } from "./types.ts";

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
