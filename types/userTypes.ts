import { Session } from "next-auth";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export interface AuthUser extends User {
}

export interface AuthSession extends Omit<Session, "user"> {
  user: AuthUser;
}

