import { db } from "@/db/connection";
import { userTable } from "@/db/schemas";
import { eq } from "drizzle-orm";
import { TCreateUserInput, TUpdateUserInput, TUser } from "@/types";
import bcrypt from "bcrypt";
import { ApiError } from "next/dist/server/api-utils";

export class UserService {
  async findMany(): Promise<TUser[]> {
    return db.query.userTable.findMany().execute();
  }
  async findOne<K extends keyof TUser>(key: K, value: TUser[K]): Promise<TUser> {
    const users = await db.select().from(userTable).where(eq(userTable[key], value)).execute();
    return users[0];
  }
  async findById(id: number): Promise<TUser> {
    if (isNaN(id)) throw new ApiError(400, "Invalid id");
    const user = await this.findOne("id", id);
    if (!user) throw new ApiError(404, "User not found");
    return user;
  }
  async create(data: TCreateUserInput) {
    data.password = await bcrypt.hash(data.password, 10);
    const updatedUsers = await db.insert(userTable).values(data).$returningId().execute();
    const newUserId = updatedUsers[0].id;
    return await this.findById(newUserId);
  }
  async updateById(id: number, data: TUpdateUserInput) {
    await this.findById(id);
    if (data.password) data.password = await bcrypt.hash(data.password, 10);
    await db.update(userTable).set(data).where(eq(userTable.id, id));
    return await this.findById(id);
  }
  async deleteById(id: number) {
    await this.findById(id);
    await db.delete(userTable).where(eq(userTable.id, id));
  }
}
