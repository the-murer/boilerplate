import { CommandHandler } from "@/types/commandHandler";
import { User } from "@/types/userTypes";
import { z } from "zod";

const updateUserByIdInput = z.object({
    userId: z.string().min(1, "User id is required"),
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });

type UpdateUserByIdInput = z.infer<typeof updateUserByIdInput>;

type UpdateUserByIdOutput = {
  success: boolean;
  user: User;
};

export const validateUpdateUserByIdInput = (data: any) => {
  return updateUserByIdInput.parse(data);
};

export type UpdateUserByIdHandler = CommandHandler<UpdateUserByIdInput, Promise<UpdateUserByIdOutput>>;