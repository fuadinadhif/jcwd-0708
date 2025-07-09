import { User } from "../types/user.type.js";
import fs from "node:fs/promises";

export async function readUsersFile() {
  const usersJSON = await fs.readFile("./data/users.json", "utf-8");
  const users = JSON.parse(usersJSON) as User[];
  return users;
}

export async function writeUsersFile(data: User[]) {}
