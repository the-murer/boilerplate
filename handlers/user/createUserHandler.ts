import { CommandHandler } from "@/types/commandHandler";
import { z } from "zod";

const CreateUserInput = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type CreateUserInput = z.infer<typeof CreateUserInput>;

type CreateUserOutput = {
  success: boolean;
};

export const createUserHandler: CommandHandler<
  CreateUserInput,
  Promise<CreateUserOutput>
> = async ({ name, email, password }) => {
    console.log("🚀 ~ >= ~ name, email, password => ", name, email, password);

    //   const user = await createUser(name, email, password);

    return { success: true };
};
