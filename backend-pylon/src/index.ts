import { app } from "@getcronit/pylon";
import { getDb } from "./db";
import { users } from "./db/userSignUpSchema";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";

export const graphql = {
  Query: {
    hello: () => {
      return "Hello, world!";
    },
  },
  Mutation: {
    signup: async (args: {
      password: string;
      email: string;
      firstName?: string;
      lastName?: string;
    }) => {
      const db = getDb();

      // Check if a user with the same email already exists using Drizzle's eq
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, args.email))
        .limit(1);

      if (existingUser.length > 0) {
        throw new Error("A user with this email already exists.");
      }

      const newUser = {
        id: nanoid(),
        email: args.email,
        password: args.password, // TODO: Add password hashing
        firstName: args.firstName ?? null,
        lastName: args.lastName ?? null,
      };

      await db.insert(users).values(newUser);

      return {
        message: "User signed up successfully",
        user: {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          
        },
      };
    },
  },
};

export default app;
