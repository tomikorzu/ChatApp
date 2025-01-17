import db from "@/server/database/db";
import { User } from "../route";

export async function checkCode(
  email: string,
  code: number
): Promise<User | null> {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT email, code, id, created_at, username FROM users where email = ?`,
      [email],
      (
        err,
        row: {
          code: number | string;
          id: number;
          username: string;
          created_at: string;
        }
      ) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          if (row.code === code) {
            db.run(
              `UPDATE users SET verified = 1, code = "-" WHERE email = ?`,
              [email]
            );
            resolve({
              id: row.id,
              email,
              username: row.username,
              created_at: row.created_at,
            });
          } else {
            resolve(null);
          }
        }
      }
    );
  });
}

export async function emailVerified(email: string) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT verified FROM users WHERE email = ?`,
      [email],
      (err, row: { verified: number }) => {
        if (err) {
          console.error(err);
        } else {
          if (!row) reject("Email not found");
          resolve(row.verified);
        }
      }
    );
  });
}
