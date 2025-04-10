import { getQueryString, pageFetcher } from "@/utils/apiUtils";
import { PaginationType } from "@/utils/pagination";
import { useQuery } from "@tanstack/react-query";

const getUsersKey = "users";

const getUsers = async ({
  page,
  limit,
  sortField,
  sortOrder,
  ...aditionalParams
}: PaginationType) =>
  pageFetcher({
    endPoint: `users?${getQueryString({
      page,
      limit,
      sortField,
      sortOrder,
      ...aditionalParams,
    })}`,
    method: "GET",
  });

export const useGetUsers = ({
  page,
  limit,
  sortField,
  sortOrder,
  ...aditionalParams
}: PaginationType) => {
  return useQuery({
    queryKey: [getUsersKey, page, limit, sortField, sortOrder, aditionalParams],
    queryFn: () =>
      getUsers({ page, limit, sortField, sortOrder, ...aditionalParams }),
  });
};
