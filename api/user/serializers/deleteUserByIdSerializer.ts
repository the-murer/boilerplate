import { CommandHandler, DefaultResponse } from "@/types/commandHandler";

import { User } from "@/types/userTypes";
import { parseZodError } from "@/utils/apiUtils";
import { z } from "zod";

const deleteUserByIdInput = z.object({
  userId: z.string({ required_error: "Id do usuário é obrigatório" }),
});

// === API HANDLERS ===

export const validateDeleteUserByIdInput = (data: DeleteUserByIdInput) =>
  parseZodError<DeleteUserByIdInput>(deleteUserByIdInput, data);

export type DeleteUserByIdHandler = CommandHandler<
  DeleteUserByIdInput,
  Promise<DeleteUserByIdOutput>
>;

// === EXPLICIT TYPES ===

export type DeleteUserByIdInput = z.infer<typeof deleteUserByIdInput>;

interface DeleteUserByIdOutput extends DefaultResponse {
  user: User;
}
