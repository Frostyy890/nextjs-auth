import { userTable, UserRoles } from "@/db/schemas";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const insertUserSchema = createInsertSchema(userTable)
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    email: z.string().email().max(100, "required to be at most 100 characters long"),
    username: z
      .string()
      .min(3, "required to be at least 3 characters long")
      .max(100, "required to be at most 100 characters long"),
    password: z
      .string()
      .min(6, "required to be at least 6 characters long")
      .max(100, "required to be at most 100 characters long"),
    role: z.enum([UserRoles.USER, UserRoles.ADMIN], { message: "invalid role" }).optional(),
  });

export const updateUserSchema = insertUserSchema.partial();

export const selectUserSchema = createSelectSchema(userTable);

export const registerUserSchema = insertUserSchema.omit({
  role: true,
});

export const loginUserSchema = registerUserSchema.omit({ email: true });
