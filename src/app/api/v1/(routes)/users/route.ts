import { type NextRequest, NextResponse } from "next/server";
import { UserService } from "../../services";
import { UserDTO } from "../../dto";

const userService = new UserService();

export async function GET() {
  const users = await userService.findMany();
  const mappedUsers = users.map((user) => new UserDTO(user));
  return NextResponse.json({ users: mappedUsers }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const newUser = await userService.create(data);
  const mappedUser = new UserDTO(newUser);
  return NextResponse.json({ user: mappedUser }, { status: 201 });
}
