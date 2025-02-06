import { NextResponse } from "next/server";
import { createUserHandler } from "@/handlers/user/createUserHandler";
import { getUsersHandler } from "@/handlers/user/getUsersHandler";
import { validateCreateUserInput } from "@/serializers/user/createUserSerializer";
import { validateGetUsersInput } from "@/serializers/user/getUsersSerializer";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  const inputData = validateGetUsersInput({
    page: Number(page),
    limit: Number(limit),
  });

  const data = await getUsersHandler(inputData);

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  const inputData = validateCreateUserInput(body);
  const data = await createUserHandler(inputData);

  return NextResponse.json(data);
}
