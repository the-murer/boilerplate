import {
    UpdateUserByIdHandler as Handler
} from "@/serializers/user/updateUserByIdSerializer";
import { User } from "@/types/userTypes";

export const updateUserByIdHandler: Handler  = async ({
  userId,
  name,
  email,
  password,
}) => {
  console.log("🚀 ~ >= ~ name, email, password => ", name, email, password);

  //   const user = await createUser(name, email, password);

  return { success: true, user: {} as User };
};
