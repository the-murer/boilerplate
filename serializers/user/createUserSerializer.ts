import { CommandHandler } from "@/types/commandHandler";
import { User } from "@/types/userTypes";
import { z } from "zod";

const createUserInput = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type CreateUserInput = z.infer<typeof createUserInput>;

type CreateUserOutput = {
  success: boolean;
  user: User;
};

export const validateCreateUserInput = (data: any) => {
  return createUserInput.parse(data);
};

export type CreateUserHandler = CommandHandler<
  CreateUserInput,
  Promise<CreateUserOutput>
>;
