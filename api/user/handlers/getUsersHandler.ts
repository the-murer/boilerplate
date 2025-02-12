import { GetUsersHandler as Handler } from "@/api/user/serializers/getUsersSerializer";
import { PaginationType, SortEnum } from "@/utils/pagination";
import dbConnect from "@/database/dbConnect";
import { findUsersWithPagination } from "@/database/repository/userRepository";
import { userSchema } from "@/types/userTypes";

const sanitizedUserSchema = userSchema.omit({ password: true });

export const getUsersHandler: Handler = async ({
  page,
  limit,
  sortField,
  sortOrder,
  name,
  email,
}) => {
  await dbConnect();

  const { users, metadata } = await findUsersWithPagination({
    page,
    limit,
    sortField: sortField || "createdAt",
    sortOrder: sortOrder || SortEnum.DESC,
    name,
    email,
  });

  const data = users.map((user) => sanitizedUserSchema.parse(user));

  return { success: true, users: data, metadata };
};
