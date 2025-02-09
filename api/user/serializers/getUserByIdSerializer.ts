import { CommandHandler, DefaultResponse } from "@/types/commandHandler";

import { User } from "@/types/userTypes";
import { parseZodError } from "@/utils/apiUtils";
import { z } from "zod";

const getUserByIdInput = z.object({
  userId: z.string({ required_error: "Id do usuário é obrigatório" }),
});

// === API HANDLERS ===

export const validateGetUserByIdInput = (data: GetUserByIdInput) =>
  parseZodError<GetUserByIdInput>(getUserByIdInput, data);

export type GetUserByIdHandler = CommandHandler<
  GetUserByIdInput,
  Promise<GetUserByIdOutput>
>;

// === EXPLICIT TYPES ===

type GetUserByIdInput = z.infer<typeof getUserByIdInput>;

interface GetUserByIdOutput extends DefaultResponse {
  user: Omit<User, "password">;
}
