import { apiHandler } from "@/utils/apiUtils";
import { createUserHandler } from "@/api/user/handlers/createUserHandler";
import { getUsersHandler } from "@/api/user/handlers/getUsersHandler";
import { validateCreateUserInput } from "@/api/user/serializers/createUserSerializer";
import { validateGetUsersInput } from "@/api/user/serializers/getUsersSerializer";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  return apiHandler({ page, limit }, validateGetUsersInput, getUsersHandler);
};

export const POST = async (req: Request) =>
  apiHandler(await req.json(), validateCreateUserInput, createUserHandler);
