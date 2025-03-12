import { CreateUserHandler as Handler } from "@/api/user/serializers/createUserSerializer";
import { User } from "@/types/userTypes";
import dbConnect from "@/database/dbConnect";
import { createUser } from "@/database/repository/userRepository";
import { hash } from "bcrypt";

export const createUserHandler: Handler = async ({ name, email, password }) => {
  await dbConnect();

  const hashedPassword = await hash(password, 10);

  const user = await createUser({
    name,
    email,
    password: hashedPassword,
  });


  const { password: _, ...userWithoutPassword } = user;

  return { success: true, user: userWithoutPassword };
};
