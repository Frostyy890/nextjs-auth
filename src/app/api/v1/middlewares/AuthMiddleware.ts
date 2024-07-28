import { type NextRequest } from "next/server";
import jwt, { type JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { ApiError } from "next/dist/server/api-utils";
import { UserService } from "../services";
import { UserRoles } from "@/db/schemas";

dotenv.config({ path: ".env.local" });

export type TAuthRequest = NextRequest & {
  user?: {
    username: string;
    role: UserRoles;
  };
};

export class AuthMiddleware {
  private userService = new UserService();
  constructor() {
    this.userService = new UserService();
  }
  async verifyToken(req: TAuthRequest) {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new ApiError(401, "Unauthorized");
    const [tokenType, token] = authHeader.split(" ");
    if (tokenType !== process.env.TOKEN_TYPE) throw new ApiError(401, "Unauthorized");
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload;
      const { username, role } = decoded;
      const user = await this.userService.findOne("username", username);
      if (!user || user.role !== role) throw new ApiError(403, "Forbidden");
      req.user = { username, role };
    } catch (error) {
      throw new ApiError(403, "Forbidden");
    }
  }
  async verifyAdmin(req: TAuthRequest) {
    if (!req.user || req.user.role !== UserRoles.ADMIN) throw new ApiError(403, "Forbidden");
  }
}
