import { User } from "@/types/userTypes";

export type PaginationType = {
  page: number;
  limit: number;
  search?: string;
  sort?: string;
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
