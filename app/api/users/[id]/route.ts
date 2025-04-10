import { RequestHeaders } from "@/types/commandHandler";
import { apiHandler } from "@/utils/apiUtils";
import { deleteUserByIdHandler } from "@/api/user/handlers/deleteUserByIdHandler";
import { getUserByIdHandler } from "@/api/user/handlers/getUserByIdHandler";
import { updateUserByIdHandler } from "@/api/user/handlers/updateUserByIdHandler";
import { validateDeleteUserByIdInput } from "@/api/user/serializers/deleteUserByIdSerializer";
import { validateGetUserByIdInput } from "@/api/user/serializers/getUserByIdSerializer";
import { validateUpdateUserByIdInput } from "@/api/user/serializers/updateUserByIdSerializer";

export const GET = async (_: Request, { params }: RequestHeaders) =>{
  const { id } = await params

  return apiHandler(
    { userId: id },
    validateGetUserByIdInput,
    getUserByIdHandler
  );
}

export const PATCH = async (req: Request, { params }: RequestHeaders) =>
  apiHandler(
    { ...(await req.json()), userId: params.id },
    validateUpdateUserByIdInput,
    updateUserByIdHandler
  );

export const DELETE = async (_: Request, { params }: RequestHeaders) =>
  apiHandler(
    { userId: params.id },
    validateDeleteUserByIdInput,
    deleteUserByIdHandler
  );
