import { type NextRequest, NextResponse } from "next/server";
import { AuthService } from "../services";
import { UserDTO } from "../dto";
import { Validate } from "../middlewares";
import { loginUserSchema, registerUserSchema } from "@/validations";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

const COOKIE_OPTIONS: Partial<ResponseCookie> = {
  httpOnly: true,
  sameSite: "none",
  // secure: true, !TODO: Uncomment in production
  maxAge: 30 * 24 * 60 * 60,
};

export class AuthController {
  private authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }
  async login(req: NextRequest) {
    const data = await req.json();
    Validate(loginUserSchema, data);
    const { user, tokens } = await this.authService.login(data);
    const { accessToken, refreshToken } = tokens;
    const mappedUser = new UserDTO(user);
    const response = NextResponse.json(
      { user: mappedUser, accessToken },
      { status: 200 }
    );
    response.cookies.set("refresh_token", refreshToken, COOKIE_OPTIONS);
    return response;
  }
  async register(req: NextRequest) {
    const data = await req.json();
    Validate(registerUserSchema, data);
    const { user, tokens } = await this.authService.register(data);
    const { accessToken, refreshToken } = tokens;
    const mappedUser = new UserDTO(user);
    const response = NextResponse.json(
      { user: mappedUser, accessToken },
      { status: 201 }
    );
    response.cookies.set("refresh_token", refreshToken, COOKIE_OPTIONS);
    return response;
  }
  async refresh(req: NextRequest) {
    const refreshToken = req.cookies.get("refresh_token")?.value;
    await this.authService.refresh(refreshToken);
  }
}
