import { type NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/app/api/v1/services";
import { UserDTO } from "../../../dto";

const authService = new AuthService();

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { user, accessToken } = await authService.register(data);
  const mappedUser = new UserDTO(user);
  return NextResponse.json({ user: mappedUser, accessToken }, { status: 201 });
}
