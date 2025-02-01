import db from "@/server/database/db";
import bcrypt from "bcrypt";

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

export function checkUserIsVerified(emailOrUsername: string, field: string) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT id FROM users WHERE ${field} = ? AND verified = 1`,
      [emailOrUsername],
      (err, row) => {
        if (err) {
          console.error("Check User Is Verified error", err);
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

export function checkUserExists(emailOrUsername: string, password: string) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM users WHERE ${
        emailOrUsername.includes("@") ? "email" : "username"
      } = ?`,
      [emailOrUsername],
      (
        err,
        row: {
          password: string;
          email: string;
          id: string;
          username: string;
          created_at: string;
        }
      ) => {
        if (err) {
          console.error("Check User Exists error", err);
          reject(err);
        }

        if (!row) resolve(false);

        bcrypt.compare(password, row.password, (err, result) => {
          if (err) {
            console.error("Check User Exists error", err);
            reject(false);
          }
          if (!result) {
            resolve(false);
          }

          resolve({
            id: row.id,
            email: row.email,
            username: row.username,
            created_at: row.created_at,
          });
        });
      }
    );
  });
}
