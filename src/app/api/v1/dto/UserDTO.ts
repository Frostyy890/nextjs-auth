import { UserRoles } from "@/db/schemas";
import { TUser } from "@/types";

export class UserDTO {
  declare id: number;
  declare email: string;
  declare username: string;
  declare role: UserRoles;
  constructor(user: TUser) {
    this.id = user.id;
    this.email = user.email;
    this.username = user.username;
    this.role = user.role;
  }
}
