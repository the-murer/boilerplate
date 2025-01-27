import { NotFoundException, RequestError } from "./errorUtils";

import { User } from "@/types/userTypes";
import bcrypt from "bcrypt";

export async function validateUserLogin(user: User, password: string) {
  if (!user) {
    throw new NotFoundException("No user found with this email");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new RequestError("Incorrect password");
  }
}
