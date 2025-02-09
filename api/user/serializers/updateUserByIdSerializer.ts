import { CommandHandler, DefaultResponse } from "@/types/commandHandler";

import { User } from "@/types/userTypes";
import { parseZodError } from "@/utils/apiUtils";
import { z } from "zod";

const updateUserByIdInput = z.object({
  userId: z.string({ required_error: "Id do usuário é obrigatório" }),
  name: z.string({ required_error: "Nome é obrigatório" }),
  email: z
    .string({ required_error: "Email é obrigatório" })
    .email("Email inválido"),
  password: z
    .string()
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .optional(),
});

// === API HANDLERS ===

export const validateUpdateUserByIdInput = (data: UpdateUserByIdInput) =>
  parseZodError<UpdateUserByIdInput>(updateUserByIdInput, data);

export type UpdateUserByIdHandler = CommandHandler<
  UpdateUserByIdInput,
  Promise<UpdateUserByIdOutput>
>;

// === EXPLICIT TYPES ===

export type UpdateUserByIdInput = z.infer<typeof updateUserByIdInput>;

interface UpdateUserByIdOutput extends DefaultResponse {
  user: User;
}
