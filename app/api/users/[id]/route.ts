import { NextResponse } from "next/server";
import { deleteUserByIdHandler } from "@/handlers/user/deleteUserByHandler";
import { getUserByIdHandler } from "@/handlers/user/getUserByIdHandler";
import { updateUserByIdHandler } from "@/handlers/user/updateUserByIdHandler";
import { validateDeleteUserByIdInput } from "@/serializers/user/deleteUserByIdSerializer";
import { validateGetUserByIdInput } from "@/serializers/user/getUserByIdSerializer";
import { validateUpdateUserByIdInput } from "@/serializers/user/updateUserByIdSerializer";

export async function GET(req: Request) {
  const inputData = validateGetUserByIdInput(req.body);
  const data = await getUserByIdHandler(inputData);

  return NextResponse.json(data);
}

export async function PATCH(req: Request) {
  const inputData = validateUpdateUserByIdInput(req.body);
  const data = await updateUserByIdHandler(inputData);

  return NextResponse.json(data);
}

export async function DELETE(req: Request) {
  const inputData = validateDeleteUserByIdInput(req.body);
  const data = await deleteUserByIdHandler(inputData);

  return NextResponse.json(data);
}
