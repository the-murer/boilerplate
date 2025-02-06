import { GetUsersHandler as Handler } from "@/serializers/user/getUsersSerializer";
import { PaginationType } from "@/utils/pagination";
import dbConnect from "@/database/dbConnect";
import { findUsersWithPagination } from "@/database/repository/userRepository";
import { userSchema } from "@/types/userTypes";

const sanitizedUserSchema = userSchema.omit({ password: true });

export const getUsersHandler: Handler = async ({ page, limit }) => {
  await dbConnect();

  const { users, metadata } = await findUsersWithPagination({ page, limit });
  const data = users.map((user) => sanitizedUserSchema.parse(user));

  return { success: true, users: data, metadata };
};
