import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export const generateAuthToken = (payload: object) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};
