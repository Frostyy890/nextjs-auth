import { db } from "./connection";
import { migrate } from "drizzle-orm/mysql2/migrator";

async function runMigrations() {
  console.log("Running migrations...");
  await migrate(db, {
    migrationsFolder: "src/db/migrations",
  });
  console.log("Migrations complete!");
  console.log("Connection closed.");
  process.exit(0);
}

runMigrations().catch((err) => {
  console.error("Error running migrations:", err);
  process.exit(1);
});
