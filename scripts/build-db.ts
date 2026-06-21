/*!
 * evolutility-server-node :: utils/database.ts
 * Methods to create postgres schema and tables from models.
 *
 * https://github.com/evoluteur/evolutility-server-node
 * (c) 2026 Olivier Giulieri
 */

import fs from "fs";
import { createRequire } from "module";
import { models, prepModels } from "./model-manager.js";
import * as helper from "./helpers.js";
import { fieldTypes } from "./dico.js";
import * as data from "../data/all_data.js";
import { config } from "../config.js";
import type { Field, Model } from "./types.js";

const require = createRequire(import.meta.url);
const { version, homepage } = require("../package.json") as {
  version: string;
  homepage: string;
};
const ft = fieldTypes;

prepModels();

const schema = config.schema ? '"' + config.schema + '"' : "";
const dbuser = "postgres"; // DB user
const sqlFile = true;

const noTZ = " without time zone";
const ft_postgreSQL: Record<string, string> = {
  text: "text",
  textmultiline: "text",
  boolean: "boolean",
  integer: "integer",
  decimal: "double precision",
  money: "double precision", // "money",
  date: "date",
  datetime: "timestamp" + noTZ,
  time: "time" + noTZ,
  lov: "integer",
  list: "integer[]",
  html: "text",
  email: "text",
  pix: "text",
  doc: "text",
  url: "text",
  color: "text",
  json: "json",
};

const sysColumns: Record<string, boolean> = {
  created_at: true,
  updated_at: true,
  created_by: true,
  updated_by: true,
  nb_comments: true,
  nb_ratings: true,
  avg_ratings: true,
};

const schemaDot = schema ? schema + "." : "";

type DataRow = Record<string, unknown>;

const stringValue = (v: string | null | undefined): string =>
  v ? "'" + v.replace(/'/g, "''") + "'" : "NULL";

const lovTable = (f: Field, tableName: string): string =>
  f.lovTable ? f.lovTable : tableName + "_" + f.id;

const lovTableWithSchema = (f: Field, tableName: string): string =>
  `${schemaDot}"${lovTable(f, tableName)}"`;

const sqlInsert = (
  tableNameSchema: string,
  m: Model,
  rows: DataRow[],
): string => {
  const pKey = m.pKey ?? "id";
  const fieldsH = m.fieldsH ?? {};
  let sqlData = "";
  let maxId = -1;

  if (rows?.length) {
    let prevCols = "";
    rows.forEach((row) => {
      const ns: string[] = [];
      const vs: unknown[] = [];
      if (row[pKey]) {
        ns.push(pKey);
        vs.push(row[pKey]);
        if ((row[pKey] as number) > maxId) {
          maxId = row[pKey] as number;
        }
      }
      for (const fid in row) {
        const f = fieldsH[fid];
        if (f && fid !== pKey) {
          let v = row[fid];
          if (v !== null) {
            ns.push(`"${f.column || f.id}"`);
            if (f.type === ft.lov) {
              v = v || null;
            } else if (f.type === ft.list) {
              if (Array.isArray(v)) {
                v = "'{" + v.join(",") + "}'";
              } else {
                v = "null";
              }
            } else if (f.type === ft.json) {
              if (typeof v === "string") {
                v = `'${v}'`;
              } else {
                v = "'" + JSON.stringify(v) + "'";
              }
            } else if (typeof v === "string") {
              v = stringValue(v);
            }
            vs.push(v);
          }
        }
      }
      const curCols = ns.join(",");
      if (curCols === prevCols) {
        sqlData += ",";
      } else {
        sqlData +=
          (prevCols ? ";\n" : "\n") +
          `INSERT INTO ${tableNameSchema}(${curCols}) VALUES`;
        prevCols = curCols;
      }
      sqlData += "\n(" + vs.join(",") + ")";
    });
    sqlData += ";\n";

    if (maxId > 0) {
      maxId++;
      sqlData += `\nALTER SEQUENCE ${schemaDot}"${m.table}_${pKey}_seq" RESTART WITH ${maxId};\n`;
    }
  }
  return sqlData;
};

const sqlCreatePopulateLOV = (
  f: Field,
  tableName: string,
  lovIncluded: string[],
): string => {
  const t = lovTableWithSchema(f, tableName);
  const icons = f.lovIcon || false;
  let sql = "";
  let maxId = -1;

  if (lovIncluded.indexOf(t) < 0) {
    sql =
      "\nCREATE TABLE IF NOT EXISTS " +
      t +
      "(\n id serial primary key,\n" +
      " name text NOT NULL" +
      (icons ? ",\n icon text" : "") +
      "\n);\n\n";

    const insertSQL = `INSERT INTO ${t}(id, name${icons ? ", icon" : ""}) VALUES `;
    if (f.list) {
      sql += insertSQL;
      sql +=
        (f.list as DataRow[])
          .map((item) => {
            if (item.id && (item.id as number) > maxId) {
              maxId = item.id as number;
            }
            let txt = "(" + item.id + "," + stringValue(item.text as string);
            txt += icons ? ",'" + (item.icon || "") + "')" : ")";
            return txt;
          })
          .join(",\n") + ";\n\n";
      const tBase = lovTable(f, tableName);
      if (maxId) {
        maxId++;
        sql += `ALTER SEQUENCE ${schemaDot}"${tBase}_id_seq" RESTART WITH ${maxId};\n\n`;
      }
    }
    lovIncluded.push(t);
  }
  return sql;
};

const sqlSchemaWithData = (): { sql: string; sqlData: string } => {
  let sql = "\nSET TIMEZONE='America/Los_angeles';\n\n";
  if (schema) {
    sql += `CREATE SCHEMA ${schema} AUTHORIZATION ${dbuser};\n\n`;
  }
  let sqlData = "";
  if (config.wTimestamp) {
    sql += `CREATE OR REPLACE FUNCTION ${schemaDot}updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    BEGIN
    NEW.${config.updatedDateColumn} = now();
RETURN NEW;
  END;

$$;

`;
  }
  for (const mid in models) {
    const sqls = sqlModel(mid);
    sql += sqls[0];
    sqlData += sqls[1];
  }
  return { sql, sqlData };
};

const sqlComment = (
  target: string,
  targetName: string,
  targetId: string | undefined,
): string =>
  `COMMENT ON ${target} ${targetName} IS '` +
  (targetId ? targetId.replace(/'/g, "") : "") +
  "';\n";

const sqlIndex = (index: string, table: string, column: string): string =>
  `CREATE INDEX idx_${index} ON ${table} USING btree (${column});\n`;

const sqlModel = (mid: string): [string, string] => {
  const m = models[mid];
  const pKey = m.pKey ?? "id";
  const { fields } = m;
  const tableName = m.table || m.id;
  const tableNameSchema = `${schemaDot}"${tableName}"`;
  const fieldsAttr: Record<string, boolean> = {};
  const colDefs: string[] = [pKey + " serial primary key"];
  let sql: string;
  let sql0: string;
  let sqlIdx = "";
  let sqlData = "";
  let sqlComments = "";

  fields.forEach((f) => {
    if (
      f.column &&
      f.column !== pKey &&
      f.type !== "formula" &&
      !fieldsAttr[f.column]
    ) {
      fieldsAttr[f.column] = true;
      if (!sysColumns[f.column]) {
        const fcolumn = `"${f.column}"`;
        sql0 = " " + fcolumn + " " + (ft_postgreSQL[f.type] || "text");
        if (f.type === ft.lov) {
          if (f.deleteTrigger) {
            sql0 +=
              " NOT NULL REFERENCES " +
              schemaDot +
              '"' +
              f.lovTable +
              '"(id) ON DELETE CASCADE';
          }
          sqlIdx += sqlIndex(
            tableName + "_" + f.column.toLowerCase(),
            tableNameSchema,
            fcolumn,
          );
        } else if (f.required) {
          sql0 += " not null";
        }
        colDefs.push(sql0);
        if (f.label) {
          sqlComments += sqlComment(
            "COLUMN",
            `${tableNameSchema}.${fcolumn}`,
            f.label,
          );
        }
      }
    }
  });

  if (config.wTimestamp) {
    colDefs.push(
      ` ${config.createdDateColumn} timestamp ${noTZ} DEFAULT timezone('utc'::text, now())`,
      ` ${config.updatedDateColumn} timestamp ${noTZ} DEFAULT timezone('utc'::text, now())`,
    );
  }
  if (config.wWhoIs) {
    colDefs.push(" created_by integer", " updated_by integer");
  }
  if (config.wComments) {
    colDefs.push(" nb_comments integer DEFAULT 0");
  }
  if (config.wRating) {
    colDefs.push(
      " nb_ratings integer DEFAULT 0",
      " avg_ratings integer DEFAULT NULL",
    );
  }

  sql =
    "\nCREATE TABLE " +
    tableNameSchema +
    "(\n" +
    colDefs.join(",\n") +
    "\n);\n";
  sql += sqlIdx;

  if (config.wTimestamp) {
    sql +=
      "\nCREATE TRIGGER tr_u_" +
      tableName +
      " BEFORE UPDATE ON " +
      `${schemaDot}${tableName}` +
      " FOR EACH ROW EXECUTE PROCEDURE " +
      schemaDot +
      "updated_at();\n";
  }

  sql += sqlComment("TABLE", tableNameSchema, m.title || m.label || m.table);
  sql += sqlComments;

  const allData = data as Record<string, DataRow[]>;
  if (allData[mid]) {
    sqlData += sqlInsert(tableNameSchema, m, allData[mid]);
  }

  const lovFields = fields.filter(
    (f) => (f.type === ft.lov || f.type === ft.list) && !f.object,
  );
  const lovIncluded: string[] = [];
  lovFields.forEach((f) => {
    sql += sqlCreatePopulateLOV(f, tableName, lovIncluded);
  });
  console.log(sql);

  return [sql, sqlData];
};

const logToFile = (sql: string, isData: boolean): void => {
  if (sqlFile) {
    const d = new Date();
    const fId = d.toISOString().replace(/:/g, "");
    const action = isData ? "populate" : "create";
    const fileName =
      "evol-db-" + (isData ? "data" : "schema") + "-" + fId + ".sql";
    const header = `/*\n Evolutility v${version}
 SQL Script to ${action} Evolutility demo DB on PostgreSQL.
 ${homepage}
 ${d}\n*/\n`;
    fs.writeFileSync("dist/db/sql/" + fileName, header + sql);
  }
};

const createSchema = (): void => {
  const { sql, sqlData } = sqlSchemaWithData();
  helper.makeDirectory("dist");
  helper.makeDirectory("dist/db/");
  helper.makeDirectory("dist/db/sql");
  logToFile(sql, false);
  logToFile(sqlData, true);
};

createSchema();
