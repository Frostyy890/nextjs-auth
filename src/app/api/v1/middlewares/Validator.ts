import { type z, ZodError } from "zod";
import { ApiError } from "next/dist/server/api-utils";

export function Validate(validationSchema: z.Schema, data: any) {
  try {
    validationSchema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      const formatedErrors = error.errors.map((err) => {
        return err.path.join(".") + " is " + err.message.toLowerCase();
      });
      throw new ApiError(400, formatedErrors[0]);
    }
    throw new ApiError(400, "Bad Request");
  }
}
