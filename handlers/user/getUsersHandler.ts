// import { GetUserByIdHandler as Handler } from "@/serializers/user/getUserByIdSerializer";
import { findUsers } from "@/database/repository/userRepository";

export const getUsersHandler: any = async () => {
  const users = await findUsers();

  return { success: true, users };
};

