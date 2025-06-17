import dbConnect from "@/database/dbConnect";
import {
  findUserById,
  updateUserById,
} from "@/database/repository/userRepository";
import { UserOperationsHandlers } from "@/types/userTypes";
import { NotFoundException } from "@/utils/errorUtils";
import { hash } from "bcrypt";

export const updateUserByIdHandler: UserOperationsHandlers["update"] = async ({
  userId,
  name,
  email,
  password,
}) => {
  await dbConnect();
  const user = await findUserById(userId);

  if (!user) throw new NotFoundException(`Usuário não encontrado`);

  if (password) user.password = await hash(password, 10);
  if (name) user.name = name;
  if (email) user.email = email;

  const updatedUser = await updateUserById(userId, user);

  return { success: true, user: updatedUser };
};
