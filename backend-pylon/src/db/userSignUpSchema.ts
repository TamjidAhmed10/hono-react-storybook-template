import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable(
  "users",
  {
    id: text("id").primaryKey().notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    firstName: text("first_name"),
    lastName: text("last_name"),
    status: text("status").notNull().default("active"),
    roleId: text("role_id").references(() => roles.id), // Removed .notNull()
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    lastLogin: integer("last_login", { mode: "timestamp" }),
  },
  () => []
);

export const roles = sqliteTable(
  "roles",
  {
    id: text("id").primaryKey().notNull(),
    name: text("name").notNull().unique(),
    permissions: text("permissions", { mode: "json" }).$type<string[]>(),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  () => []
);
export const usersRelations = relations(users, ({ one }) => ({
  role: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),
}));