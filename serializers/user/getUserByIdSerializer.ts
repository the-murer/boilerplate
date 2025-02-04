import { CommandHandler } from "@/types/commandHandler";
import { User } from "@/types/userTypes";
import { z } from "zod";

const getUserByIdInput = z.object({
  userId: z.string().min(1, "User id is required"),
});

type GetUserByIdInput = z.infer<typeof getUserByIdInput>;

type GetUserByIdOutput = {
  success: boolean;
  user: User;
};

export const validateGetUserByIdInput = (data: any) => {
  return getUserByIdInput.parse(data);
};


export type GetUserByIdHandler = CommandHandler<
  GetUserByIdInput,
  Promise<GetUserByIdOutput>
>;
