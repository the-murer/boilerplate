import { NextApiRequest, NextApiResponse } from "next";

export type CommandHandler<Input, Output> = (input: Input) => Output;
