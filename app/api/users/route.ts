import { apiHandler } from "@/utils/apiUtils";
import { createUserHandler } from "@/api/user/handlers/createUserHandler";
import { getUsersHandler } from "@/api/user/handlers/getUsersHandler";
import { validateCreateUserInput } from "@/api/user/serializers/createUserSerializer";
import { validateGetUsersInput } from "@/api/user/serializers/getUsersSerializer";
import { extractPaginationParams } from "@/utils/pagination";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const paginationParams = extractPaginationParams(searchParams);

  // ADITIONAL PARAMS
  const name = searchParams.get("name") || "";
  const email = searchParams.get("email") || "";

  return apiHandler(
    { ...paginationParams, name, email },
    validateGetUsersInput,
    getUsersHandler
  );
};

export const POST = async (req: Request) =>
  apiHandler(await req.json(), validateCreateUserInput, createUserHandler);
