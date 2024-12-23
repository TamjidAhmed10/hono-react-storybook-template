import { drizzle } from "drizzle-orm/libsql";
import { getContext } from "@getcronit/pylon";

/**
 * Automatically initializes and returns a database instance.
 * This function retrieves the context internally and uses it to configure the database connection.
 */
export const getDb = () => {
  const ctx = getContext();
  return drizzle({
    connection: {
      url: ctx.env.TURSO_CONNECTION_URL,
      authToken: ctx.env.TURSO_AUTH_TOKEN,
    },
  });
};
