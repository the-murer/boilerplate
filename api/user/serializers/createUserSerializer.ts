import { CommandHandler, DefaultResponse } from "@/types/commandHandler";

import { User } from "@/types/userTypes";
import { parseZodError } from "@/utils/apiUtils";
import { z } from "zod";

export const createUserResolver = z.object({
  name: z
    .string({
      required_error: "Nome é obrigatório",
    })
    .min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z
    .string({
      required_error: "Email é obrigatório",
    })
    .email("Email inválido"),
  password: z
    .string({ required_error: "Senha é obrigatória" })
    .min(8, "Senha deve ter pelo menos 8 caracteres"),
});

// === API HANDLERS ===

export const validateCreateUserInput = (data: CreateUserInput) =>
  parseZodError<CreateUserInput>(createUserResolver, data);

export type CreateUserHandler = CommandHandler<
  CreateUserInput,
  Promise<CreateUserOutput>
>;

// === EXPLICIT TYPES ===

export type CreateUserInput = z.infer<typeof createUserResolver>;

interface CreateUserOutput extends DefaultResponse {
  user: Omit<User, "password">;
}
