/*!
 * evolutility-server-node :: utils/database.js
 * Methods to create postgres schema and tables from models.
 *
 * https://github.com/evoluteur/evolutility-server-node
 * (c) 2022 Olivier Giulieri
 */

const path = require("path"),
  fs = require("fs"),
  { version, homepage } = require("../package.json"),
  { prepModels } = require("./model-manager"),
  { makeDirectory } = require("./helpers"),
  { fieldTypes } = require("./dico");

const ft = fieldTypes;
const { models } = require("./model-manager");
const data = require("../data/all_data.js");
prepModels();

// - options; mostly from in config.js
const config = require("../config"),
  schema = config.schema ? '"' + config.schema + '"' : "",
  //dbuser = 'evol',
  dbuser = "postgres", // DB user
  sqlFile = true; // log SQL to file

const noTZ = " without time zone";
const ft_postgreSQL = {
  text: "text",
  textmultiline: "text",
  boolean: "boolean",
  integer: "integer",
  decimal: "double precision",
  money: "money",
  date: "date",
  datetime: "timestamp" + noTZ,
  time: "time" + noTZ,
  lov: "integer",
  list: "integer[]", // many values for one field (array of integer for ids in lovTable)
  html: "text",
  email: "text",
  pix: "text",
  //geoloc: 'geolocation',
  doc: "text",
  url: "text",
  color: "text",
  json: "json",
};

const sysColumns = {
  created_at: true,
  updated_at: true,
  c_uid: true,
  u_uid: true,
  nb_comments: true,
  nb_ratings: true,
  avg_ratings: true,
};

const schemaDot = schema ? schema + "." : "";

const stringValue = (v) => (v ? "'" + v.replace(/'/g, "''") + "'" : "NULL");

const lovTable = (f, tableName) =>
  f.lovTable ? f.lovTable : tableName + "_" + f.id;

const lovTableWithSchema = (f, tableName) =>
  schemaDot + '"' + lovTable(f, tableName) + '"';

const sqlInsert = (tableNameSchema, m, data) => {
  const { pKey, fieldsH } = m;
  let sqlData = "";
  let maxId = -1;
  // -- insert sample data
  if (data) {
    let prevCols = "";
    data.forEach(function (row) {
      var ns = [],
        vs = [];
      if (row[pKey]) {
        ns.push(pKey);
        vs.push(row[pKey]);
        if (row[pKey] > maxId) {
          maxId = row[pKey];
        }
      }
      for (let fid in row) {
        const f = fieldsH[fid];
        if (f && fid !== pKey) {
          let v = row[fid];
          if (v !== null) {
            ns.push(`"${f.column || f.id}"`);
            if (f.type === ft.lov) {
              //TODO: parseint?
              v = v || null; //"['error']";
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
          "INSERT INTO " +
          tableNameSchema +
          "(" +
          curCols +
          ") VALUES";
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

const sqlCreatePopulateLOV = (f, tableName, lovIncluded) => {
  const t = lovTableWithSchema(f, tableName);
  const icons = f.lovIcon || false;
  let sql = "";
  let maxId = -1;

  if (lovIncluded.indexOf(t) < 0) {
    // - create lov table
    // TODO: icon font
    sql =
      "\nCREATE TABLE IF NOT EXISTS " +
      t +
      "(\n id serial primary key,\n" +
      " name text NOT NULL" +
      (icons ? ",\n icon text" : "") +
      "\n);\n\n";

    // - populate lov table
    const insertSQL =
      "INSERT INTO " + t + "(id, name" + (icons ? ", icon" : "") + ") VALUES ";
    if (f.list) {
      sql += insertSQL;
      sql +=
        f.list
          .map((item) => {
            if (item.id && item.id > maxId) {
              maxId = item.id;
            }
            let txt = "(" + item.id + "," + stringValue(item.text);
            txt += icons ? ",'" + (item.icon || "") + "')" : ")";
            return txt;
          })
          .join(",\n") + ";\n\n";
      const t = lovTable(f, tableName);
      if (maxId) {
        maxId++;
        sql += `ALTER SEQUENCE ${schema}${t}_id_seq" RESTART WITH ${maxId};\n\n`;
      }
    }
    lovIncluded.push(t);
  }
  return sql;
};

const sqlSchemaWithData = () => {
  let sql = "SET TIMEZONE='America/Los_angeles';\n\n";
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
  for (let mid in models) {
    const sqls = sqlModel(mid);
    sql += sqls[0];
    sqlData += sqls[1];
  }
  return {
    sql: sql,
    sqlData: sqlData,
  };
};

const sqlComment = (target, targetName, targetId) =>
  `COMMENT ON ${target} ${targetName} IS '` +
  (targetId ? targetId.replace(/'/g, "") : "") +
  "';\n";

const sqlIndex = (index, table, column) =>
  `CREATE INDEX idx_${index} ON ${table} USING btree (${column});\n`;

/*
function sqlSearch(m){
    const table = m.table||m.id
    const schemaTable = schema+'."'+table+'"'
    const fn = schema + '.search_' + table
    const searchColumn = f => 't1.'+f.column+' ilike (\'%\' || search || \'%\') '
    let searchColumns = m.searchFields

return `
create function ${fn}(search text) returns setof ${schemaTable} as $$
select t1.*
from ${schemaTable} as t1
where t1.headline ilike ('%' || search || '%') or t1.body ilike ('%' || search || '%')
$$ language sql stable;

comment on function ${fn}(text) is 'Returns ${m.namePlural} containing a given search term.';
`
}
*/
const sqlModel = (mid) => {
  // -- generates SQL script to create a Postgres DB table for the ui model
  const m = models[mid];
  let { pKey, fields } = m;
  let tableName = m.table || m.id,
    tableNameSchema = schemaDot + '"' + tableName + '"',
    fieldsAttr = {},
    //subCollecs = m.collections,
    fs = [pKey + " serial primary key"],
    sql,
    sql0,
    sqlIdx = "",
    sqlData = "",
    sqlComments = "";

  // fields
  fields.forEach(function (f) {
    if (
      f.column &&
      f.column !== pKey &&
      f.type !== "formula" &&
      !fieldsAttr[f.column]
    ) {
      fieldsAttr[f.column] = true;
      // skip fields specified in config
      if (!sysColumns[f.column]) {
        const fcolumn = '"' + f.column + '"';
        sql0 = " " + fcolumn + " " + (ft_postgreSQL[f.type] || "text");
        if (f.type === ft.lov) {
          if (f.deleteTrigger) {
            sql0 +=
              " NOT NULL REFERENCES " +
              schema +
              '."' +
              f.lovTable +
              '"(id) ON DELETE CASCADE';
          }
          sqlIdx += sqlIndex(
            tableName + "_" + f.column.toLowerCase(),
            tableNameSchema,
            fcolumn
          );
        } else if (f.required) {
          sql0 += " not null";
        }
        fs.push(sql0);
        if (f.label) {
          sqlComments += sqlComment(
            "COLUMN",
            tableNameSchema + "." + fcolumn,
            f.label
          );
        }
      }
    }
  });

  // - "timestamp" columns to track creation and last modification.
  if (config.wTimestamp) {
    fs.push(
      config.createdDateColumn +
        " timestamp" +
        noTZ +
        " DEFAULT timezone('utc'::text, now())"
    );
    fs.push(
      config.updatedDateColumn +
        " timestamp" +
        noTZ +
        " DEFAULT timezone('utc'::text, now())"
    );
  }
  // - "who-is" columns to track user who created and last modified the record.
  if (config.wWhoIs) {
    fs.push(" c_uid integer");
    fs.push(" u_uid integer");
  }

  // - tracking number of comments.
  if (config.wComments) {
    fs.push(" nb_comments integer DEFAULT 0");
  }

  // - tracking ratings.
  if (config.wRating) {
    fs.push(" nb_ratings integer DEFAULT 0");
    fs.push(" avg_ratings integer DEFAULT NULL"); // smallint ?
  }
  /*
    // subCollecs - as json columns
    if(subCollecs){
        subCollecs.forEach(function(c, idx){
            fs.push('  "'+(c.column || c.id)+'" json');
        });
    }
*/
  sql = "\nCREATE TABLE " + tableNameSchema + "(\n" + fs.join(",\n") + "\n);\n";
  sql += sqlIdx;

  // - track updates
  if (config.wTimestamp) {
    sql +=
      "\nCREATE TRIGGER tr_u_" +
      tableName +
      " BEFORE UPDATE ON " +
      schema +
      "." +
      tableName +
      " FOR EACH ROW EXECUTE PROCEDURE " +
      schema +
      ".updated_at();\n";
  }

  // Comments on table and columns with description
  sql += sqlComment("TABLE", tableNameSchema, m.title || m.label || m.table);
  sql += sqlComments;

  // -- insert sample data
  if (data[mid]) {
    sqlData += sqlInsert(tableNameSchema, m, data[mid]);
  }

  // - add lov tables
  var lovFields = fields.filter(function (f) {
    return (f.type === ft.lov || f.type === ft.list) && !f.object;
  });
  var lovIncluded = [];
  if (lovFields) {
    lovFields.forEach((f) => {
      sql += sqlCreatePopulateLOV(f, tableName, lovIncluded);
    });
  }
  console.log(sql);

  return [sql, sqlData];
};

const logToFile = (sql, isData) => {
  if (sqlFile) {
    const d = new Date(),
      fId = d.toISOString().replace(/:/g, ""),
      action = isData ? "populate" : "create";
    const fileName =
      "evol-db-" + (isData ? "data" : "schema") + "-" + fId + ".sql";
    const header = `-- Evolutility v${version}
-- SQL Script to ${action} Evolutility demo DB on PostgreSQL.
-- ${homepage}
-- ${d}\n\n`;
    makeDirectory("dist");
    makeDirectory("dist/sql");
    fs.writeFile("dist/sql/" + fileName, header + sql, function (err) {
      if (err) {
        throw err;
      }
    });
  }
};

const createSchema = () => {
  let { sql, sqlData } = sqlSchemaWithData();

  logToFile(sql, false);
  logToFile(sqlData, true);
};

createSchema();
