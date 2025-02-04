import { DeleteUserByIdHandler as Handler } from "@/serializers/user/deleteUserByIdSerializer";
import { NotFoundException } from "@/utils/errorUtils";
import { deleteUserById } from "@/database/repository/userRepository";

export const deleteUserByIdHandler: Handler = async ({ userId }) => {
  const user = await deleteUserById(userId);

  if (!user) {
    throw new NotFoundException(`User with id ${userId} not found`);
  }

  return { success: true, user };
};
