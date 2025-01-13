import db from "@/server/database/db";
import { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function verifyPasswordNotBeTheSame(
  tokenRes: JwtPayload,
  newPassword: string
) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT password FROM users WHERE email = ?`,
      [tokenRes.email],
      (err, row: { password: string }) => {
        if (err) {
          console.error(
            "There was an error in verifyPasswordNotBeTheSame",
            err
          );
          reject(err);
        }

        if (!row) {
          reject("The email doesn't exist");
        }

        bcrypt.compare(newPassword, row.password, (err, result) => {
          if (err) {
            console.error(
              "There was an error in verifyPasswordNotBeTheSame",
              err
            );
            reject(err);
          }
          if (result) {
            resolve(true);
          }
          resolve(false);
        });
      }
    );
  });
}

export async function changePassword(email: string, newPassword: string) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(newPassword, 10, (err, hash) => {
      if (err) {
        console.error("There was an error in changePassword", err);
        reject(err);
      }

      db.run(
        `UPDATE users SET password = ? WHERE email = ?`,
        [hash, email],
        (err) => {
          if (err) {
            console.error("There was an error in changePassword", err);
            reject(err);
          }
          resolve(true);
        }
      );
    });
  });
}
