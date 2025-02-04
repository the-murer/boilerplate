import { GetUserByIdHandler as Handler } from "@/serializers/user/getUserByIdSerializer";
import { NotFoundException } from "@/utils/errorUtils";
import { findUserById } from "@/database/repository/userRepository";

export const getUserByIdHandler: Handler = async ({ userId }) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new NotFoundException(`User with id ${userId} not found`);
  }

  return { success: true, user };
};



