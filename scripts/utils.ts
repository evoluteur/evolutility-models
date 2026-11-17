/*!
 *  Evolutility-Models
 *  Helper functions mostly for writing to files and console.
 *
 *  https://github.com/evoluteur/evolutility-models
 *  (c) 2026 Olivier Giulieri
 */

import path from "path";
import fs from "fs";

export const fnError = (err: NodeJS.ErrnoException | null): void => {
  if (err) throw err;
};

export const removeDirectory = (nDir: string): void => {
  if (fs.existsSync(nDir)) {
    fs.readdirSync(nDir).forEach((entry) => {
      const entry_path = path.join(nDir, entry);
      if (fs.lstatSync(entry_path).isDirectory()) {
        removeDirectory(entry_path);
      } else {
        fs.unlinkSync(entry_path);
      }
    });
    fs.rmdirSync(nDir);
  }
};

export const clearDirectory = (nDir: string): void => {
  removeDirectory(nDir);
  fs.mkdirSync(nDir);
};

export const makeDirectory = (nDir: string): void => {
  if (!fs.existsSync(nDir)) {
    fs.mkdirSync(nDir);
  }
};

export const makeDirectoryPath = (dir: string): void => {
  const parts = dir.split("/");
  let p = "";
  for (const part of parts) {
    p += part + "/";
    makeDirectory(p);
  }
};

export const writeFile = (filename: string, txt: string): void => {
  console.log("=> " + filename);
  fs.writeFile(filename, txt, fnError);
};

const asciiArt =
  "  ___         _      _   _ _ _ _         \n" +
  " | __|_ _____| |_  _| |_(_) (_) |_ _  _  \n" +
  " | _|\\ V / _ \\ | || |  _| | | |  _| || | \n" +
  " |___|\\_/\\___/_|\\_,_|\\__|_|_|_|\\__|\\_, | \n" +
  "                                   |__/  \n ";

export const splash = () => {
  console.log(asciiArt);
};
