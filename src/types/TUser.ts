import {
  insertUserSchema,
  updateUserSchema,
  selectUserSchema,
  loginUserSchema,
  registerUserSchema,
} from "@/validations";
import { z } from "zod";

export type TCreateUserInput = z.infer<typeof insertUserSchema>;

export type TUpdateUserInput = z.infer<typeof updateUserSchema>; // For future reference

export type TRegisterUserInput = z.infer<typeof registerUserSchema>;

export type TLoginUserInput = z.infer<typeof loginUserSchema>;

export type TUser = z.infer<typeof selectUserSchema>;
