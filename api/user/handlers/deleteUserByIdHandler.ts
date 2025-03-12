import { DeleteUserByIdHandler as Handler } from "@/api/user/serializers/deleteUserByIdSerializer";
import { NotFoundException } from "@/utils/errorUtils";
import dbConnect from "@/database/dbConnect";
import { deleteUserById } from "@/database/repository/userRepository";

export const deleteUserByIdHandler: Handler = async ({ userId }) => {
  await dbConnect();
  const user = await deleteUserById(userId);

  if (!user) {
    throw new NotFoundException(`User with id ${userId} not found`);
  }

  return { success: true, user };
};
