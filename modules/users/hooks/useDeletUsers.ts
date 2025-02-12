import { DeleteUserByIdInput } from "@/api/user/serializers/deleteUserByIdSerializer";
import { pageFetcher } from "@/utils/apiUtils";
import { useMutation } from "@tanstack/react-query";

const deleteUser = async ({ userId }: DeleteUserByIdInput) =>
  pageFetcher({
    endPoint: `api/users/${userId}`,
    method: "DELETE",
  });

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: deleteUser,
  });
};
