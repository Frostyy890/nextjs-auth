import {
  mysqlTable,
  mysqlEnum,
  timestamp,
  varchar,
  int,
} from "drizzle-orm/mysql-core";
import { createId } from "@paralleldrive/cuid2";
import { userTable } from "./user.schema";

export enum SessionStatus {
  ACTIVE = "active",
  EXPIRED = "expired",
  REVOKED = "revoked",
}

const sessionTable = mysqlTable("Session", {
  id: varchar("id", { length: 25 })
    .$defaultFn(() => createId())
    .primaryKey(),
  userId: int("userId")
    .references(() => userTable.id)
    .notNull(),
  refreshToken: varchar("refreshToken", { length: 255 }).notNull(),
  userAgent: varchar("userAgent", { length: 255 }).notNull(),
  ip: varchar("ip", { length: 50 }).notNull(),
  status: mysqlEnum("status", [
    SessionStatus.ACTIVE,
    SessionStatus.EXPIRED,
    SessionStatus.REVOKED,
  ]).notNull(),
  deviceInfo: varchar("deviceInfo", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
});
