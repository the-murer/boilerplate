import User from "@/database/models/User";
import { User as UserType } from "@/types/userTypes";

export async function findUserByEmail(email: string): Promise<UserType | null> {
  return (await User.findOne({ email }).lean()) as UserType | null;
}

export async function createUser(
  name: string,
  email: string,
  password: string,
): Promise<UserType | null> {
  return (await User.create({ name, email, password })) as UserType | null;
}

export async function findUserById(id: string): Promise<UserType | null> {
  return (await User.findById(id).lean()) as UserType | null;
}
