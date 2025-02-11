import { getQueryString, pageFetcher } from "@/utils/apiUtils";
import { PaginationType } from "@/utils/pagination";
import { useQuery } from "@tanstack/react-query";


const getUsers = async ({ page, limit, sortField, sortOrder }: PaginationType) =>
  pageFetcher({
    data: undefined,
    endPoint: `api/users?${getQueryString({ page, limit, sortField, sortOrder })}`,
    method: "GET",
  });

export const useGetUsers = ({ page, limit, sortField, sortOrder }: PaginationType) => {
  return useQuery({
    queryKey: ["users", page, limit, sortField, sortOrder],
    queryFn: () => getUsers({ page, limit, sortField, sortOrder }),
  });
};
