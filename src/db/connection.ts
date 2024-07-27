import { drizzle } from "drizzle-orm/mysql2";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import * as schema from "./schemas";

dotenv.config({ path: ".env.local" });

const pool = mysql.createPool({
  uri: process.env.DATABASE_URL,
});
export const db = drizzle(pool, { schema, mode: "default", logger: true });
