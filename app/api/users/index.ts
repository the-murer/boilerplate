import { NextApiRequest, NextApiResponse } from "next";

import User from "@/database/models/User";
import { createUserHandler, validateCreateUserInput } from "@/handlers/user/createUserHandler";
import dbConnect from "@/database/dbConnect";
import { getUserByIdHandler, validateGetUserByIdInput } from "@/handlers/user/getUserByIdHandler";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      const getData = validateGetUserByIdInput(req.body);
      return getUserByIdHandler(getData);
    case "POST":
      const postData = validateCreateUserInput(req.body);
      return createUserHandler(postData);
    default:
      res.status(400).json({ success: false });
      break;
  }
}
