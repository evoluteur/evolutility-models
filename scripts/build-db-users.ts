/*!
 *  SQL script to create the tables for users and their sessions (login):
 *  - 005_create_users: tables "evol_user" and "evol_session"
 *
 *  No user is created: create the first one w/ evolutility-server-node
 *  ("npm run user:add -- you@example.com admin").
 *
 *  https://github.com/evoluteur/evolutility-models
 *  (c) 2026 Olivier Giulieri
 */

import fs from "fs";
import { makeDirectoryPath } from "./utils.ts";
import { config } from "../config.ts";
import pkg from "../package.json" with { type: "json" };

const { version, homepage } = pkg;
const schemaDot = config.schema ? `"${config.schema}".` : "";
const U = `${schemaDot}evol_user`;
const S = `${schemaDot}evol_session`;
const noTZ = " without time zone";
const now = "timezone('utc', now())";

export const sqlCreateUserTables = (): string => `
CREATE TABLE IF NOT EXISTS ${U} (
 id serial PRIMARY KEY,
 email text NOT NULL,
 name text,
 role text NOT NULL DEFAULT 'viewer' CHECK (role IN ('viewer', 'editor', 'admin')),
 password_hash text NOT NULL,
 active boolean NOT NULL DEFAULT true,
 last_login_at timestamp${noTZ},
 created_at timestamp${noTZ} DEFAULT ${now},
 updated_at timestamp${noTZ} DEFAULT ${now}
);
CREATE UNIQUE INDEX IF NOT EXISTS evol_user_email ON ${U} (lower(email));
COMMENT ON TABLE ${U} IS 'Users (roles: viewer, editor, admin)';
COMMENT ON COLUMN ${U}.password_hash IS 'scrypt hash, never the password';

CREATE TABLE IF NOT EXISTS ${S} (
 id text PRIMARY KEY,
 user_id integer NOT NULL REFERENCES ${U}(id) ON DELETE CASCADE,
 created_at timestamp${noTZ} DEFAULT ${now},
 expires_at timestamp${noTZ} NOT NULL
);
CREATE INDEX IF NOT EXISTS evol_session_user ON ${S} (user_id);
CREATE INDEX IF NOT EXISTS evol_session_expires ON ${S} (expires_at);
COMMENT ON TABLE ${S} IS 'Login sessions (id is a hash of the token in the cookie)';
`;

const createUsersSQL = (): void => {
  const d = new Date();
  const fId = d.toISOString().replace(/:/g, "");
  const dir = "dist/db/sql/";
  makeDirectoryPath(dir);
  const file = `${dir}005_create_users_${fId}.sql`;
  fs.writeFileSync(
    file,
    `/*
  SQL Script to create the tables for users and sessions on PostgreSQL.
  Create the first user w/ evolutility-server-node (password shown once):
    npm run user:add -- you@example.com admin
  or w/ a name and password:
    npm run user:add -- you@example.com admin --name="Your Name" --password=a-long-password
  Generated on ${d.toLocaleString().replace(", ", " at ")}.
  Powered by evolutility-models v${version} - ${homepage}
*/\n` + sqlCreateUserTables(),
  );
  console.log(`SQL saved in ${file}.`);
};

createUsersSQL();
