import { userTable } from "@/db/schemas";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const insertUserSchema = createInsertSchema(userTable);

export const selectUserSchema = createSelectSchema(userTable);

export const registerUserSchema = insertUserSchema.pick({
  email: true,
  username: true,
  password: true,
});

export const loginUserSchema = registerUserSchema.omit({ email: true });
