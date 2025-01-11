import { isEmailInUse, isUsernameInUse } from "./querys";

interface ValidationError {
  msg: string;
  location: string;
}

export async function validateRegister(
  username: string,
  email: string,
  password: string
) {
  const errors: ValidationError[] = [];

  if (!username || username.trim() === "") {
    errors.push({
      msg: "Username is required",
      location: "username",
    });
  } else {
    if (username.length < 2 || username.length > 30) {
      errors.push({
        msg: "Username must be between 2 and 30 characters",
        location: "username",
      });
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      errors.push({
        msg: "Username can only contain letters, numbers, and underscores",
        location: "username",
      });
    }
    const usernameInUse = await isUsernameInUse(username);
    if (usernameInUse) {
      errors.push({
        msg: "Username is already in use",
        location: "username",
      });
    }
  }

  if (!email || email.trim() === "") {
    errors.push({
      msg: "Email is required",
      location: "email",
    });
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push({
        msg: "Invalid email format",
        location: "email",
      });
    }
    const emailInUse = await isEmailInUse(email);
    if (emailInUse) {
      errors.push({
        msg: "Email is already in use",
        location: "email",
      });
    }
  }

  if (!password || password.trim() === "") {
    errors.push({
      msg: "Password is required",
      location: "password",
    });
  } else {
    if (password.length < 8 || password.length > 30) {
      errors.push({
        msg: "Password must be between 8 and 30 characters long",
        location: "password",
      });
    }
    if (!/\d/.test(password)) {
      errors.push({
        msg: "Password must contain at least one number",
        location: "password",
      });
    }
    if (!/[A-Z]/.test(password)) {
      errors.push({
        msg: "Password must contain at least one uppercase letter",
        location: "password",
      });
    }
    if (!/[!@#\$%\^&\*]/.test(password)) {
      errors.push({
        msg: "Password must contain at least one special character (!@#$%^&*)",
        location: "password",
      });
    }
  }

  return errors;
}