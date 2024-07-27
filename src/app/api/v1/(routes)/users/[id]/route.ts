import { type NextRequest, NextResponse } from "next/server";
import { UserService } from "../../../services";
import { UserDTO } from "../../../dto";

const userService = new UserService();

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await userService.findById(Number.parseInt(params.id));
  const mappedUser = new UserDTO(user);
  return NextResponse.json({ user: mappedUser }, { status: 200 });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  const updatedUser = await userService.updateById(
    Number.parseInt(params.id),
    data
  );
  const mappedUser = new UserDTO(updatedUser);
  return NextResponse.json({ user: mappedUser }, { status: 200 });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  await userService.deleteById(Number.parseInt(params.id));
  return NextResponse.json({}, { status: 200 });
}
