import { CreateUserHandler as Handler } from "@/serializers/user/createUserSerializer";
import { User } from "@/types/userTypes";
import dbConnect from "@/database/dbConnect";

export const createUserHandler: Handler = async ({ name, email, password }) => {
  await dbConnect();
  console.log("🚀 ~ >= ~ name, email, password => ", name, email, password);

  //   const user = await createUser(name, email, password);

  return { success: true, user: {} as User };
};
