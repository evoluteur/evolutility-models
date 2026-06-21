/*!
 * evolutility :: utils/dico.ts
 * Helper functions for metadata
 *
 * https://github.com/evoluteur/evolutility
 * (c) 2026 Olivier Giulieri
 */

import { config } from "../config.ts";
import type { Field } from "./types.ts";

export const fieldTypes = {
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
  list: "list",
  html: "html",
  formula: "formula",
  email: "email",
  image: "image",
  url: "url",
  color: "color",
  hidden: "hidden",
  json: "json",
} as const;

const ft = fieldTypes;

export const systemFields: Partial<Field>[] = [];

if (config.wTimestamp) {
  systemFields.push(
    { type: "datetime", column: config.createdDateColumn },
    { type: "datetime", column: config.updatedDateColumn },
  );
}
if (config.wWhoIs) {
  systemFields.push(
    { type: "integer", column: "created_by" },
    { type: "integer", column: "updated_by" },
  );
}
if (config.wComments) {
  systemFields.push({ type: "integer", column: "nb_comments" });
}
if (config.wRating) {
  systemFields.push(
    { type: "integer", column: "nb_ratings" },
    { type: "integer", column: "avg_ratings" },
  );
}

export const fieldInMany = (f: Field): boolean => !!(f.inList || f.inMany);
export const fieldIsNumber = (f: Field): boolean =>
  f.type === ft.int || f.type === ft.dec || f.type === ft.money;
export const fieldIsText = (f: Field): boolean =>
  ([ft.text, ft.textml, ft.url, ft.html, ft.email] as string[]).includes(
    f.type,
  );
export const fieldIsDateOrTime = (f: Field): boolean =>
  f.type === ft.date || f.type === ft.datetime || f.type === ft.time;
export const fieldIsNumeric = (f: Field): boolean =>
  fieldIsNumber(f) || fieldIsDateOrTime(f);
export const fieldChartable = (f: Field): boolean =>
  f.type === ft.lov || f.type === ft.bool || fieldIsNumber(f);
export const fieldInCharts = (f: Field): boolean =>
  fieldChartable(f) && !f.noCharts;
