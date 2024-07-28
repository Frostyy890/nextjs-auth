import { type NextRequest, NextResponse } from "next/server";
import { AuthService } from "../services";
import { UserDTO } from "../dto";
import { Validate } from "../middlewares";
import { loginUserSchema, registerUserSchema } from "@/validations";

export class AuthController {
  private authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }
  async login(req: NextRequest) {
    const data = await req.json();
    Validate(loginUserSchema, data);
    const { user, accessToken } = await this.authService.login(data);
    const mappedUser = new UserDTO(user);
    const response = NextResponse.json({ user: mappedUser, accessToken }, { status: 200 });
    response.cookies.set("refreshToken", accessToken);
    return response;
  }
  async register(req: NextRequest) {
    const data = await req.json();
    Validate(registerUserSchema, data);
    const { user, accessToken } = await this.authService.register(data);
    const mappedUser = new UserDTO(user);
    return NextResponse.json({ user: mappedUser, accessToken }, { status: 201 });
  }
}
