import { pageFetcher } from "@/utils/apiUtils";
import { useQuery } from "@tanstack/react-query";

const getUserKey = "user";

const getUser = async ({ userId }: { userId: string }) =>
  pageFetcher({
    endPoint: `/users/${userId}`,
    method: "GET",
  });

export const useGetUser = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: [getUserKey, userId],
    queryFn: () => getUser({ userId }),
  });
};
