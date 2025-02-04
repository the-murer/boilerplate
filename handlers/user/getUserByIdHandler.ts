import { CommandHandler } from "@/types/commandHandler";
import { NotFoundException } from "@/utils/errorUtils";
import { User } from "@/types/userTypes";
import { findUserById } from "@/database/repository/userRepository";
import { z } from "zod";

const GetUserByIdInput = z.object({
  id: z.string().min(1, "Id is required"),
});

type GetUserByIdInput = z.infer<typeof GetUserByIdInput>;

type GetUserByIdOutput = {
  success: boolean;
  user: User;
};

export const getUserByIdHandler: CommandHandler<
  GetUserByIdInput,
  Promise<GetUserByIdOutput>
> = async ({ id }) => {
  const user = await findUserById(id);

  if (!user) {
    throw new NotFoundException(`User with id ${id} not found`);
  }

  return { success: true, user };
};



export const validateGetUserByIdInput = (data: any) => {
  return GetUserByIdInput.parse(data);
};
