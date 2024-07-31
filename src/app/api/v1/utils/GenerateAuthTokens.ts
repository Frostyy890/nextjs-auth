import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export const generateAuthTokens = (payload: object) => {
  const accessToken = jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
  const refreshToken = jwt.sign(
    payload,
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
  return { accessToken, refreshToken };
};
