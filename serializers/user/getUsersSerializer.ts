import { CommandHandler } from "@/types/commandHandler";
import { User } from "@/types/userTypes";
import { z } from "zod";

const getUsersInput = z.object({
  page: z.number(),
  limit: z.number(),
});

type GetUsersInput = z.infer<typeof getUsersInput>;

type GetUsersOutput = {
  success: boolean;
  users: Omit<User, "password">[];
};

export const validateGetUsersInput = (data: any) => {
  return getUsersInput.parse(data);
};


export type GetUsersHandler = CommandHandler<
  GetUsersInput,
  Promise<GetUsersOutput>
>;
