import { RequestHeaders } from "@/types/commandHandler";
import { apiHandler } from "@/utils/apiUtils";
import { deleteUserByIdHandler } from "@/api/user/handlers/deleteUserByIdHandler";
import { getUserByIdHandler } from "@/api/user/handlers/getUserByIdHandler";
import { updateUserByIdHandler } from "@/api/user/handlers/updateUserByIdHandler";
import { userIdSerializer, userUpdateSerializer } from "@/types/userTypes";

export const GET = async (_: Request, { params }: RequestHeaders) =>{
  const { id } = await params

  return apiHandler(
    { userId: id },
    userIdSerializer,
    getUserByIdHandler
  );
}

export const PATCH = async (req: Request, { params }: RequestHeaders) =>
  apiHandler(
    { ...(await req.json()), userId: params.id },
    userUpdateSerializer,
    updateUserByIdHandler
  );

export const DELETE = async (_: Request, { params }: RequestHeaders) =>
  apiHandler(
    { userId: params.id },
    userIdSerializer,
    deleteUserByIdHandler
  );
