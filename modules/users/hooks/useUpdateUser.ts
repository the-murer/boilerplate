import { UpdateUserByIdInput } from "@/api/user/serializers/updateUserByIdSerializer";
import { pageFetcher } from "@/utils/apiUtils";
import { useMutation } from "@tanstack/react-query";

const updateUser = async ({ userId, ...data }: UpdateUserByIdInput) =>
  pageFetcher({ data, endPoint: `api/users/${userId}`, method: "PUT" });

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: updateUser,
  });
};
