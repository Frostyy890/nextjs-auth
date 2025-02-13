import { UserService } from "./UserService";
import { TRegisterUserInput, TLoginUserInput } from "@/types";
import bcrypt from "bcrypt";
import { ApiError } from "next/dist/server/api-utils";
import { generateAuthTokens } from "../utils";

export class AuthService {
  private readonly userService: UserService;
  constructor() {
    this.userService = new UserService();
  }
  async register(data: TRegisterUserInput) {
    const user = await this.userService.create(data);
    const tokens = generateAuthTokens({
      username: user.username,
      role: user.role,
    });
    return { user, tokens };
  }
  async login(data: TLoginUserInput) {
    const user = await this.userService.findOne("username", data.username);
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new ApiError(400, "Invalid credentials");
    }
    const tokens = generateAuthTokens({
      username: user.username,
      role: user.role,
    });
    return { user, tokens };
  }
  async refresh(refreshToken: string | undefined) {
    if (!refreshToken) throw new ApiError(401, "Unauthorized");
  }
}
