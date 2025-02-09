import {
    UpdateUserByIdHandler as Handler
} from "@/api/user/serializers/updateUserByIdSerializer";
import { User } from "@/types/userTypes";
import dbConnect from "@/database/dbConnect";

export const updateUserByIdHandler: Handler  = async ({
  userId,
  name,
  email,
  password,
}) => {
  console.log("🚀 ~ >= ~ name, email, password => ", name, email, password);
  await dbConnect();
  //   const user = await createUser(name, email, password);

  return { success: true, user: {} as User };
};
