/*!
 * evolutility :: utils/model-manager.ts
 * Helper functions for metadata
 *
 * https://github.com/evoluteur/evolutility
 * (c) 2026 Olivier Giulieri
 */

import * as modelsNS from "../models/all_models.js";
import { config } from "../config.js";
import { fieldIsText } from "./dico.js";
import type { Model, Field, Collection } from "./types.js";

const models: Record<string, Model> = { ...(modelsNS as Record<string, Model>) };
const schema = '"' + (config.schema || "evolutility") + '"';
let modelIds = Object.keys(models);

function prepModel(m: Model | null | undefined): Model | null {
  if (m) {
    if (!m._prepared) {
      m.schemaTable = schema + '."' + (m.table || m.id) + '"';
      if (!m.pKey) m.pKey = "id";
      m.fieldsH = {};
      m.fields?.forEach((f, idx) => {
        if (f.type === "lov") f.t2 = "t_" + idx;
        if (f.id !== m.table + "_id") {
          m.fieldsH![f.id] = f;
        }
      });
      if (m.searchFields) {
        if (!Array.isArray(m.searchFields)) {
          m.searchFields = [m.searchFields as unknown as string];
        }
      } else {
        m.searchFields = m.fields.filter((f) => f.inSearch).map((f) => f.id);
        if (m.searchFields.length < 1) {
          m.searchFields = m.fields
            .filter((f) => f.inMany && fieldIsText(f))
            .map((f) => f.id);
        }
      }
      m._prepared = true;
    }
    return m;
  }
  console.error("Error: undefined model.");
  return null;
}

function prepModelCollecs(
  m: Model | null,
  allModels: Record<string, Model>,
): Model | null {
  if (m) {
    m.collecsH = {};
    if (m.collections) {
      m.collections.forEach((c) => {
        if (c.object) {
          const collecModel = allModels[c.object];
          if (collecModel) {
            if (!c.table) c.table = collecModel.table;
            if (!c.fields) {
              c.fields = collecModel.fields.filter(
                (f) => f.inMany && f.object !== c.object,
              ) as Field[];
            }
            const fsh = collecModel.fieldsH!;
            (c.fields as (Field | string)[]).forEach((f, idx) => {
              if (typeof f === "string") {
                (c.fields as Field[])[idx] = JSON.parse(
                  JSON.stringify(fsh[f] || {}),
                );
              }
              const field = (c.fields as Field[])[idx];
              if (field?.type === "lov") field.t2 = "t_" + idx;
            });
          } else {
            console.log(
              'Model "' + c.object + '" not found in model "' + m.id + '".',
            );
          }
        }
        m.collecsH![c.id] = c as Collection;
      });
    }
    return m;
  }
  return null;
}

const prepModels = (): Record<string, Model> => {
  modelIds = Object.keys(models);
  console.log(modelIds.length + " models:", modelIds.sort().join(", ") + ".");
  modelIds.forEach((id) => {
    models[id] = prepModel(models[id])!;
  });
  modelIds.forEach((id) => {
    models[id] = prepModelCollecs(models[id], models)!;
  });
  return models;
};

prepModels();

export const getModel = (mId: string): Model | null => prepModel(models[mId]);
export { modelIds, models, prepModel, prepModels };
