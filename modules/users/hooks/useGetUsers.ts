import { pageFetcher } from "@/utils/apiUtils";
import { PaginationType } from "@/utils/pagination";
import { useQuery } from "@tanstack/react-query";


const getUsers = async ({ page, limit }: PaginationType) =>
  pageFetcher({
    data: undefined,
    endPoint: `api/users?page=${page - 1}&limit=${limit}`,
    method: "GET",
  });

export const useGetUsers = ({ page, limit }: PaginationType) => {
  return useQuery({
    queryKey: ["users", page, limit],
    queryFn: () => getUsers({ page, limit }),
  });
};
