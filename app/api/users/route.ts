import { apiHandler } from "@/utils/apiUtils";
import { createUserHandler } from "@/api/user/handlers/createUserHandler";
import { getUsersHandler } from "@/api/user/handlers/getUsersHandler";
import { extractPaginationParams } from "@/utils/pagination";
import { userBodySerializer, userPaginatedSerializer } from "@/types/userTypes";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const paginationParams = extractPaginationParams(searchParams);

  // ADITIONAL PARAMS
  const name = searchParams.get("name") || "";
  const email = searchParams.get("email") || "";

  return apiHandler(
    { ...paginationParams, name, email },
    userPaginatedSerializer,
    getUsersHandler
  );
};

export const POST = async (req: Request) =>
  apiHandler(await req.json(), userBodySerializer, createUserHandler);
