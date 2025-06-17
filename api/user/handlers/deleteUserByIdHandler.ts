import { NotFoundException } from "@/utils/errorUtils";
import dbConnect from "@/database/dbConnect";
import { deleteUserById } from "@/database/repository/userRepository";
import { UserOperationsHandlers } from "@/types/userTypes";

export const deleteUserByIdHandler: UserOperationsHandlers["delete"] = async ({
  userId,
}) => {
  await dbConnect();
  const user = await deleteUserById(userId);

  if (!user) {
    throw new NotFoundException(`Usuário não encontrado`);
  }

  return { success: true, user };
};
