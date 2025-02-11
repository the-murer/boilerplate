import { CommandHandler, DefaultResponse } from "@/types/commandHandler";

import { User } from "@/types/userTypes";
import { parseZodError } from "@/utils/apiUtils";
import { SortEnum } from "@/utils/pagination";
import { z } from "zod";

const getUsersInput = z.object({
  page: z.number(),
  limit: z.number(),
  sortField: z.string().nullable(),
  sortOrder: z.nativeEnum(SortEnum).nullable(),
  search: z.string().optional(),
});

// === API HANDLERS ===

export const validateGetUsersInput = (data: GetUsersInput) =>
  parseZodError<GetUsersInput>(getUsersInput, data);

export type GetUsersHandler = CommandHandler<
  GetUsersInput,
  Promise<GetUsersOutput>
>;


// === EXPLICIT TYPES ===

type GetUsersInput = z.infer<typeof getUsersInput>;

interface GetUsersOutput extends DefaultResponse {
  users: Omit<User, "password">[];
}
