import db from "./db";

export type Params =
  | object
  | number
  | string
  | null
  | undefined
  | Array<Params>

function runAsync(query: string, params: Params): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(query, params !== null ? params : null, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function getAsync(query: string, params: Params = []): Promise<Params> {
  return new Promise((resolve, reject) => {
    db.get(query, params !== null ? params : null, (err, row) => {
      if (err) reject(err);
      if (!row) resolve(404);
      else resolve(row as Params);
    });
  });
}

function allAsync(query: string, params: Params = []): Promise<Params[]> {
  return new Promise((resolve, reject) => {
    db.all(query, params !== null ? params : null, (err, rows) => {
      if (err) reject(err);
      if (!rows) reject(404);
      else resolve(rows as Params[]);
    });
  });
}

export { runAsync, getAsync, allAsync };
