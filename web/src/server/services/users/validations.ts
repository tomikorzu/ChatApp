import { getAsync } from "@/server/database/helpers";

export async function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 400;
  }

  const inUse = await isFieldInUse("email", email);
  if (inUse !== 404) return 409;
}

export async function validateUsername(username: string) {
  if (username.length < 4) {
    return "Username must be at least 4 characters long";
  }
  if (username.length > 30) {
    return "Username must be at most 30 characters long";
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return "Username can only contain letters, numbers, and underscores";
  }

  const inUse = await isFieldInUse("username", username);
  if (inUse !== 404) return 409;

  return false;
}

export async function validateBio(bio: string) {
  if (bio.length > 160) {
    return "Bio must be at most 160 characters long";
  }
  return false;
}

export async function validateAllFields(data: string, type: string) {
  if (type === "email") {
    const emailValidations = await validateEmail(data);
    if (emailValidations === 400) return "Invalid email";
    if (emailValidations === 409) return "Email is in use";

    return false;
  }
  if (type === "username") {
    const usernameValidations = await validateUsername(data);
    if (usernameValidations === 409) return "Username is in use";
    if (usernameValidations) return usernameValidations;
  }

  if (type === "bio") {
    const bioValidations = await validateBio(data);
    if (bioValidations) return bioValidations;
  }
  return false;
}

export async function isFieldInUse(field: string, value: string) {
  return await getAsync(`SELECT id FROM users WHERE ${field} = ?`, [value]);
}
