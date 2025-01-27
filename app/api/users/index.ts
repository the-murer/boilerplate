import { NextApiRequest, NextApiResponse } from "next";

import User from "@/database/models/User";
import { createUserHandler } from "@/handlers/user/createUserHandler";
import dbConnect from "@/database/dbConnect";
import { getUserByIdHandler } from "@/handlers/user/getUserByIdHandler";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      return getUserByIdHandler(req.body);
    case "POST":
      return createUserHandler(req.body);
    default:
      res.status(400).json({ success: false });
      break;
  }
}
