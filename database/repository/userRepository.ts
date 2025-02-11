import { PaginatedResult, PaginationType } from "@/utils/pagination";

import User from "@/database/models/User";
import { User as UserType } from "@/types/userTypes";

export async function findUserByEmail(email: string): Promise<UserType | null> {
  return (await User.findOne({ email }).lean()) as UserType | null;
}

export async function findUsersWithPagination({
  page,
  limit,
  sortField,
  sortOrder,
  search,
}: PaginationType): Promise<PaginatedResult> {
  const totalEntries = await User.countDocuments();
  const totalPages = Math.ceil(totalEntries / limit);

  const users = (await User.find()
    .skip((page - 1) * limit)
    .sort({ [sortField]: sortOrder })
    .limit(limit)) as UserType[];

  return {
    users,
    metadata: {
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
      totalPages,
      currentPage: page,
      totalEntries,
    },
  };
}

export async function createUser(
  name: string,
  email: string,
  password: string
): Promise<UserType | null> {
  return (await User.create({ name, email, password })) as UserType | null;
}

export async function findUserById(id: string): Promise<UserType | null> {
  return (await User.findById(id).lean()) as UserType | null;
}

export async function deleteUserById(id: string): Promise<UserType | null> {
  return (await User.findByIdAndDelete(id).lean()) as UserType | null;
}

export async function updateUserById(
  id: string,
  data: Partial<UserType>
): Promise<UserType | null> {
  return (await User.findByIdAndUpdate(id, data, {
    new: true,
  }).lean()) as UserType | null;
}
