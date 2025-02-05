import { Session } from "next-auth";
import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

export type User = z.infer<typeof userSchema>

export interface AuthUser extends User {}

export interface AuthSession extends Omit<Session, "user"> {
  user: AuthUser;
}

