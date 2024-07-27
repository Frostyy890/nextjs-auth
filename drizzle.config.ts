import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export default defineConfig({
  dialect: "mysql",
  out: "./src/db/migrations",
  schema: "./src/db/schemas/index.ts",
  dbCredentials: { url: process.env.DATABASE_URL as string },
});
