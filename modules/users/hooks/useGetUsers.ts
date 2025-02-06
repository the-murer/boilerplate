import { PaginationType } from "@/utils/pagination";
import { useQuery } from "@tanstack/react-query";

const getUsers = async ({ page, limit }: PaginationType) => {
  const response = await fetch(`api/users?page=${page - 1}&limit=${limit}`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
};

export const useGetUsers = ({ page, limit }: PaginationType) => {
  return useQuery({
    queryKey: ["users", page, limit],
    queryFn: () => getUsers({ page, limit }),
  });
};
