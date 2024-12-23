// for hashing the password

import { db } from "../db";
import { roles, users } from "../db/userSignUpSchema";

// Function to handle user sign up
export const userSignUp = async (email: string, password: string) => {
  await db.insert(users).values({
    id: "ssssss",
    email: "as",
    password: "saa",
  });
  return { s: "as" };
};
const generateUniqueId = (): string => {
  return "user-" + Date.now(); // A simple unique ID based on the current timestamp
};
