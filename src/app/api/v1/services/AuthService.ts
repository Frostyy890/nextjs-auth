import { UserService } from "./UserService";
import { TRegisterUserInput, TLoginUserInput } from "@/types";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export class AuthService {
  private readonly userService: UserService;
  constructor() {
    this.userService = new UserService();
  }
  async register(data: TRegisterUserInput) {
    const user = await this.userService.create(data);
    const accessToken = jwt.sign(
      { username: user.username, role: user.role },
      process.env.ACCESS_TOKEN_SECRET as string
    );
    return { user, accessToken };
  }
  async login(data: TLoginUserInput) {
    const user = await this.userService.findOne("username", data.username);
    if (!user) throw new Error("User not found");
    const isPasswordMatch = await bcrypt.compare(data.password, user.password);
    if (!isPasswordMatch) throw new Error("Invalid password");
    const accessToken = jwt.sign(
      { username: user.username, role: user.role },
      process.env.ACCESS_TOKEN_SECRET as string
    );
    return { user, accessToken };
  }
}
