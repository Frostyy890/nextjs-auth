import { UserService } from "./UserService";
import { TRegisterUserInput, TLoginUserInput } from "@/types";
import bcrypt from "bcrypt";
import { ApiError } from "next/dist/server/api-utils";
import { generateAuthToken } from "../utils";

export class AuthService {
  private readonly userService: UserService;
  constructor() {
    this.userService = new UserService();
  }
  async register(data: TRegisterUserInput) {
    const user = await this.userService.create(data);
    const accessToken = generateAuthToken({ username: user.username, role: user.role });
    return { user, accessToken };
  }
  async login(data: TLoginUserInput) {
    const user = await this.userService.findOne("username", data.username);
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new ApiError(400, "Invalid credentials");
    }
    const accessToken = generateAuthToken({ username: user.username, role: user.role });
    return { user, accessToken };
  }
}
