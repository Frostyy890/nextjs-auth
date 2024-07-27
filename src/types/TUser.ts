import {
  insertUserSchema,
  selectUserSchema,
  loginUserSchema,
  registerUserSchema,
} from "@/validations";
import { z } from "zod";

export type TCreateUserInput = Omit<
  z.infer<typeof insertUserSchema>,
  "id" | "createdAt" | "updatedAt"
>;
export type TUpdateUserInput = Partial<TCreateUserInput>; // For future reference

export type TRegisterUserInput = z.infer<typeof registerUserSchema>;

export type TLoginUserInput = z.infer<typeof loginUserSchema>;

export type TUser = z.infer<typeof selectUserSchema>;
