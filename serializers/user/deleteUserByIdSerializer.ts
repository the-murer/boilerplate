import { CommandHandler } from "@/types/commandHandler";
import { User } from "@/types/userTypes";
import { z } from "zod";

const deleteUserByIdInput = z.object({
  userId: z.string().min(1, "User id is required"),
});

type DeleteUserByIdInput = z.infer<typeof deleteUserByIdInput>;

type DeleteUserByIdOutput = {
  success: boolean;
  user: User;
};

export const validateDeleteUserByIdInput = (data: any) => {
  return deleteUserByIdInput.parse(data);
};

export type DeleteUserByIdHandler = CommandHandler<
  DeleteUserByIdInput,
  Promise<DeleteUserByIdOutput>
>;
