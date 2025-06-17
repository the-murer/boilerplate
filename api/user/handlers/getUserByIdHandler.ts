import { NotFoundException } from "@/utils/errorUtils";
import dbConnect from "@/database/dbConnect";
import { findUserById } from "@/database/repository/userRepository";
import { userSchema } from "@/types/userTypes";
import { UserOperationsHandlers } from "@/types/userTypes";

const sanitizedUserSchema = userSchema.omit({ password: true });

export const getUserByIdHandler: UserOperationsHandlers["getById"] = async ({
  userId,
}) => {
  await dbConnect();
  const user = await findUserById(userId);

  if (!user) {
    throw new NotFoundException(`User with id ${userId} not found`);
  }

  const sanitizedUser = sanitizedUserSchema.parse(user);

  return { success: true, user: sanitizedUser };
};
