import { User } from "@/types/userTypes";

export enum SortEnum {
  ASC = "asc",
  DESC = "desc",
}

export type PaginationType = {
  page: number;
  limit: number;
  search?: string;
  sortField: string;
  sortOrder: SortEnum;
};

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
