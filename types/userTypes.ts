import { PaginatedResult, paginatedSerializer } from "@/utils/pagination";
import { Session } from "next-auth";
import { z } from "zod";
import { CommandHandler as Handler, DefaultResponse } from "./commandHandler";

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  roles: z.array(z.string()).optional(),
});

export type User = z.infer<typeof userSchema>;

interface UserResponse extends DefaultResponse {
  user: Omit<User, "password">;
}

// === SERIALIZERS ===

export const userBodySerializer = z.object({
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

export const userIdSerializer = z.object({
  userId: z.string({ required_error: "Id do usuário é obrigatório" }),
});

export const userUpdateSerializer = userIdSerializer.merge(
  userBodySerializer.partial()
);

export const userPaginatedSerializer = paginatedSerializer.merge(
  userBodySerializer.omit({ password: true })
);

// === INPUTS ===

export type UserInputs = {
  create: z.infer<typeof userBodySerializer>;
  update: z.infer<typeof userUpdateSerializer>;
  delete: z.infer<typeof userIdSerializer>;
  getById: z.infer<typeof userIdSerializer>;
  getPaginated: z.infer<typeof userPaginatedSerializer>;
  // ADITIONAL OPERATION INPUTS
};

export type UserOperationsHandlers = {
  create: Handler<UserInputs["create"], Promise<UserResponse>>;
  update: Handler<UserInputs["update"], Promise<UserResponse>>;
  delete: Handler<UserInputs["delete"], Promise<UserResponse>>;
  getById: Handler<UserInputs["getById"], Promise<UserResponse>>;
  getPaginated: Handler<
  UserInputs["getPaginated"],
    Promise<PaginatedResult<UserResponse>>
  >;
  // ADITIONAL OPERATION HANDLERS
};

const UserOperationsValidation = {

}

// === EXTRAS ===
export interface AuthUser extends User {}

export interface AuthSession extends Omit<Session, "user"> {
  user: AuthUser;
}
