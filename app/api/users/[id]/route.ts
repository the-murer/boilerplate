import { NextResponse } from "next/server";
import { RequestHeaders } from "@/types/commandHandler";
import { deleteUserByIdHandler } from "@/handlers/user/deleteUserByHandler";
import { getUserByIdHandler } from "@/handlers/user/getUserByIdHandler";
import { updateUserByIdHandler } from "@/handlers/user/updateUserByIdHandler";
import { validateDeleteUserByIdInput } from "@/serializers/user/deleteUserByIdSerializer";
import { validateGetUserByIdInput } from "@/serializers/user/getUserByIdSerializer";
import { validateUpdateUserByIdInput } from "@/serializers/user/updateUserByIdSerializer";

export async function GET(_: any, { params }: RequestHeaders) {
  const inputData = validateGetUserByIdInput({ userId: params.id });
  const data = await getUserByIdHandler(inputData);

  return NextResponse.json(data);
}

export async function PATCH(req: Request, { params }: RequestHeaders) {
  const body = await req.json();

  const inputData = validateUpdateUserByIdInput({ ...body, userId: params.id });
  const data = await updateUserByIdHandler(inputData);

  return NextResponse.json(data);
}

export async function DELETE(_: Request, { params }: RequestHeaders) {
  const inputData = validateDeleteUserByIdInput({ userId: params.id });
  const data = await deleteUserByIdHandler(inputData);

  return NextResponse.json(data);
}
