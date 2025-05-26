import { User } from "@/types/userTypes";
import { z } from "zod";

export enum SortEnum {
  ASC = "asc",
  DESC = "desc",
}

export type PaginationType = {
  page: number;
  limit: number;
  sortField: string;
  sortOrder: SortEnum;
};


export const basePaginationResolver = z.object({
  page: z.number().min(0),
  limit: z.number().min(0),
  sortField: z.string().optional().nullable(),
  sortOrder: z.nativeEnum(SortEnum).optional().nullable(),
});

export type PaginatedResult = {
  users: User[];
  metadata: {
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    totalEntries: number;
  };
};

export const extractPaginationParams = (params: URLSearchParams) => {
  const page = parseInt(params.get("page") || "1");
  const limit = parseInt(params.get("limit") || "10");
  const sortField = params.get("sortField");
  const sortOrder = params.get("sortOrder");
 
    return {
      page,
      limit,
      sortField,
      sortOrder,
    }
};
