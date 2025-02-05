import dbConnect from "@/database/dbConnect";
import { findUsers } from "@/database/repository/userRepository";
import { userSchema } from "@/types/userTypes";

const sanitizedUserSchema = userSchema.omit({ password: true });

export const getUsersHandler = async () => {
  await dbConnect();
  const users = await findUsers();
  const data = users.map((user) => sanitizedUserSchema.parse(user));

  return { success: true, users: data };
};
