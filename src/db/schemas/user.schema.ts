import {
  mysqlTable,
  mysqlEnum,
  timestamp,
  varchar,
  serial,
} from "drizzle-orm/mysql-core";

export enum UserRoles {
  ADMIN = "admin",
  USER = "user",
}

export const userTable = mysqlTable("User", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 100 }).notNull(),
  role: mysqlEnum("role", [UserRoles.ADMIN, UserRoles.USER])
    .default(UserRoles.USER)
    .notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
