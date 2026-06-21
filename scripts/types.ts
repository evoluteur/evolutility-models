/*!
    Evolutility-Models — shared TypeScript types
    https://github.com/evoluteur/evolutility-models
    (c) 2026 Olivier Giulieri
*/

export type FieldType =
  | "text"
  | "textmultiline"
  | "boolean"
  | "integer"
  | "decimal"
  | "money"
  | "date"
  | "datetime"
  | "time"
  | "lov"
  | "list"
  | "html"
  | "formula"
  | "email"
  | "image"
  | "url"
  | "color"
  | "hidden"
  | "json";

export interface Field {
  id: string;
  type: FieldType | string;
  label?: string;
  column?: string;
  dbcolumn?: string;
  required?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  minLength?: number;
  min?: number;
  max?: number;
  defaultValue?: unknown;
  inMany?: boolean;
  inList?: boolean;
  inSearch?: boolean;
  lovTable?: string;
  dbtablelov?: string;
  lovColumn?: string;
  dbcolumnreadlov?: string;
  lovIcon?: boolean;
  onlyDB?: boolean;
  onlyUI?: boolean;
  noCharts?: boolean;
  noStats?: boolean;
  list?: unknown;
  object?: string;
  entity?: string;
  deleteTrigger?: boolean;
  labelShort?: string;
  width?: number | string;
  height?: number | string;
  chartType?: string;
  help?: string;
  t2?: string;
}

export interface Collection {
  id: string;
  title?: string;
  label?: string;
  object?: string;
  entity?: string;
  table?: string;
  column?: string;
  icon?: string;
  orderBy?: string;
  fields?: (Field | string)[];
}

export interface Model {
  id: string;
  oid?: string;
  title?: string;
  label?: string;
  world?: string | null;
  name?: string;
  namePlural?: string;
  icon?: string;
  active?: boolean;
  position?: number;
  defaultViewMany?: string;
  defaultViewOne?: string;
  titleField?: string;
  titleFunction?: string | null;
  table?: string;
  pKey?: string;
  fields: Field[];
  groups?: unknown[];
  collections?: Collection[];
  noCharts?: boolean;
  noStats?: boolean;
  searchFields?: string[];
  schemaTable?: string;
  fieldsH?: Record<string, Field>;
  collecsH?: Record<string, Collection>;
  _prepared?: boolean;
}
