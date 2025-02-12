import { getQueryString, pageFetcher } from "@/utils/apiUtils";
import { PaginationType } from "@/utils/pagination";
import { useQuery } from "@tanstack/react-query";


const getUsers = async ({
  page,
  limit,
  sortField,
  sortOrder,
  ...aditionalParams
}: PaginationType) =>
  pageFetcher({
    endPoint: `api/users?${getQueryString({
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
    queryKey: ["users", page, limit, sortField, sortOrder, aditionalParams],
    queryFn: () =>
      getUsers({ page, limit, sortField, sortOrder, ...aditionalParams }),
  });
};
