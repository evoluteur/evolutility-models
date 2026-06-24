/*!
 * evolutility :: utils/dico.ts
 * Helper functions for metadata
 *
 * https://github.com/evoluteur/evolutility
 * (c) 2026 Olivier Giulieri
 */

import { config } from "../config.ts";
import { FieldType as ft, type Field } from "./types.ts";

export const systemFields: Partial<Field>[] = [];

if (config.wTimestamp) {
  systemFields.push(
    { type: ft.datetime, column: config.createdDateColumn },
    { type: ft.datetime, column: config.updatedDateColumn },
  );
}
if (config.wWhoIs) {
  systemFields.push(
    { type: ft.integer, column: "created_by" },
    { type: ft.integer, column: "updated_by" },
  );
}
if (config.wComments) {
  systemFields.push({ type: ft.integer, column: "nb_comments" });
}
if (config.wRating) {
  systemFields.push(
    { type: ft.integer, column: "nb_ratings" },
    { type: ft.integer, column: "avg_ratings" },
  );
}

export const fieldInMany = (f: Field): boolean => !!(f.inList || f.inMany);
export const fieldIsNumber = (f: Field): boolean =>
  f.type === ft.integer || f.type === ft.decimal || f.type === ft.money;
export const fieldIsText = (f: Field): boolean =>
  ([ft.text, ft.textmultiline, ft.url, ft.html, ft.email] as string[]).includes(
    f.type,
  );
export const fieldIsDateOrTime = (f: Field): boolean =>
  f.type === ft.date || f.type === ft.datetime || f.type === ft.time;
export const fieldIsNumeric = (f: Field): boolean =>
  fieldIsNumber(f) || fieldIsDateOrTime(f);
export const fieldChartable = (f: Field): boolean =>
  f.type === ft.lov || f.type === ft.boolean || fieldIsNumber(f);
export const fieldInCharts = (f: Field): boolean =>
  fieldChartable(f) && !f.noCharts;
