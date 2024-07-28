import { type NextRequest, NextResponse } from "next/server";
import { UserService } from "../services";
import { UserDTO } from "../dto";
import { Validate } from "../middlewares";
import { insertUserSchema, updateUserSchema } from "@/validations";

export class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }
  async findMany(req: NextRequest) {
    const users = await this.userService.findMany();
    const mappedUsers = users.map((user) => new UserDTO(user));
    return NextResponse.json({ users: mappedUsers }, { status: 200 });
  }
  async findById(req: NextRequest, { params }: { params: { id: string } }) {
    const user = await this.userService.findById(Number.parseInt(params.id));
    const mappedUser = new UserDTO(user);
    return NextResponse.json({ user: mappedUser }, { status: 200 });
  }
  async create(req: NextRequest) {
    const data = await req.json();
    Validate(insertUserSchema, data);
    const newUser = await this.userService.create(data);
    const mappedUser = new UserDTO(newUser);
    return NextResponse.json({ user: mappedUser }, { status: 201 });
  }
  async updateById(req: NextRequest, { params }: { params: { id: string } }) {
    const data = await req.json();
    Validate(updateUserSchema, data);
    const updatedUser = await this.userService.updateById(Number.parseInt(params.id), data);
    const mappedUser = new UserDTO(updatedUser);
    return NextResponse.json({ user: mappedUser }, { status: 200 });
  }
  async deleteById(req: NextRequest, { params }: { params: { id: string } }) {
    await this.userService.deleteById(Number.parseInt(params.id));
    return NextResponse.json({ success: true }, { status: 200 });
  }
}
