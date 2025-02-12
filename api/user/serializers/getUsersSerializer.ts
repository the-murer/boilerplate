import { CommandHandler, DefaultResponse } from "@/types/commandHandler";

import { User } from "@/types/userTypes";
import { parseZodError } from "@/utils/apiUtils";
import { SortEnum, basePaginationResolver } from "@/utils/pagination";
import { z } from "zod";

const getUsersInput = basePaginationResolver.extend({
  name: z.string().optional(),
  email: z.string().optional(),
});

// === API HANDLERS ===

export const validateGetUsersInput = (data: GetUsersInput) =>
  parseZodError<GetUsersInput>(getUsersInput, data);

export type GetUsersHandler = CommandHandler<
  GetUsersInput,
  Promise<GetUsersOutput>
>;

// === EXPLICIT TYPES ===

export type GetUsersInput = z.infer<typeof getUsersInput>;

interface GetUsersOutput extends DefaultResponse {
  users: Omit<User, "password">[];
}
