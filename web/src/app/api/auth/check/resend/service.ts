import db from "@/server/database/db";

export async function changeCode(email: string) {
  const newCode = Math.floor(100000 + Math.random() * 900000).toString();
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE users SET code = ? WHERE email = ? AND verified = 0`,
      [newCode, email],
      (err) => {
        if (err) {
          console.error(
            "There was an error changing the code from api/auth/check/resend/service.ts",
            err
          );
          reject(err);
        }
        resolve(newCode);
      }
    );
  });
}
