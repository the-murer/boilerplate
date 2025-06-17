import { SortEnum } from "@/utils/pagination";
import dbConnect from "@/database/dbConnect";
import { findUsersWithPagination } from "@/database/repository/userRepository";
import { User, userSchema } from "@/types/userTypes";
import { UserOperationsHandlers } from "@/types/userTypes";

const sanitizedUserSchema = userSchema.omit({ password: true });

export const getUsersHandler: UserOperationsHandlers["getPaginated"] = async ({
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

  const data = users.map((user: User) => sanitizedUserSchema.parse(user));

  return { success: true, items: data, metadata };
};
