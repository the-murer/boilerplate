import { PaginatedResult, PaginationType } from "@/utils/pagination";

import User from "@/database/models/User";
import { User as UserType } from "@/types/userTypes";

export type UserFilters = {
  name?: string;
  email?: string;
};

export async function findUserByEmail(email: string): Promise<UserType | null> {
  return (await User.findOne({ email }).lean()) as UserType | null;
}

export async function findUsersWithPagination({
  page,
  limit,
  sortField,
  sortOrder,
  name,
  email,
}: PaginationType & UserFilters): Promise<PaginatedResult> {
  
  const query: any = {};
  
  if (name) query.name = { $regex: name, $options: "i" };
  if (email) query.email = { $regex: email, $options: "i" };
  
  const totalEntries = await User.countDocuments(query);
  const totalPages = Math.ceil(totalEntries / limit);
  const users = (await User.find(query)
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
  user: Omit<UserType, "id">
): Promise<UserType> {
  return (await User.create(user)) as UserType;
}

export async function findUserById(id: string): Promise<UserType | null> {
  return (await User.findById(id)) as UserType | null;
}

export async function deleteUserById(id: string): Promise<UserType | null> {
  return (await User.findByIdAndDelete(id).lean()) as UserType | null;
}

export async function updateUserById(
  id: string,
  data: Partial<UserType>
): Promise<UserType> {
  return (await User.findByIdAndUpdate(id, data, {
    new: true,
  }).lean()) as unknown as UserType;
}
