import { CreateUserInput } from "@/api/user/serializers/createUserSerializer";
import { pageFetcher } from "@/utils/apiUtils";
import { useMutation } from "@tanstack/react-query";

const createUser = async (data: CreateUserInput) =>
  pageFetcher({ data, endPoint: "api/users", method: "POST" });

export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser,
  });
};
