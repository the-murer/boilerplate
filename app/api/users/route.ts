import { NextResponse } from "next/server";
import { createUserHandler } from "@/handlers/user/createUserHandler";
import { getUsersHandler } from "@/handlers/user/getUsersHandler";
import { validateCreateUserInput } from "@/serializers/user/createUserSerializer";

export async function GET() {
  const data = await getUsersHandler();

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  const inputData = validateCreateUserInput(body);
  const data = await createUserHandler(inputData);

  return NextResponse.json(data);
}
