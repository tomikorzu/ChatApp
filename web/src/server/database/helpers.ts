import db from "./db";

type Params = object | number | string | null | undefined | Array<Params>;

function runAsync(query: string, params: Params): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(query, params, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function getAsync(query: string, params: Params = []): Promise<Params> {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) reject(err);
      if (!row) resolve(404);
      else resolve(row as Params);
    });
  });
}

function allAsync(query: string, params: Params = []): Promise<Params[]> {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      if (!rows) reject(404);
      else resolve(rows as Params[]);
    });
  });
}

export { runAsync, getAsync, allAsync };
