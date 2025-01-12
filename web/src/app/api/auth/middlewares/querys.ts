import db from "@/server/database/db";

export function isUsernameInUse(username: string) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT id FROM users WHERE username = ?`,
      [username.toLowerCase()],
      (err, row) => {
        if (err) {
          console.error("Is Username In Use error", err);
          reject(err);
        }

        if (row) {
          resolve(true);
        }

        resolve(false);
      }
    );
  });
}

export function isEmailInUse(email: string) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT id FROM users WHERE email = ?`, [email], (err, row) => {
      if (err) {
        console.error("Is Email In Use error", err);
        reject(err);
      }

      if (row) {
        resolve(true);
      }

      resolve(false);
    });
  });
}
