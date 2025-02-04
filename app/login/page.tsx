"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useLogin } from "./loginHooks";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Login() {
  const { onSubmit, loginSchema } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center">
        <Card style={{ width: "20%" }}>
          <CardHeader className="flex justify-center">
            <h1 className="text-2xl font-bold">Fazer Login</h1>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardBody className="flex flex-col gap-4">
              <Input
                label="Email"
                placeholder="Insira seu email"
                type="email"
                className="w-full"
                {...register("email", { required: true })}
              />
              <Input
                label="Senha"
                placeholder="Insira sua senha"
                type="password"
                className="w-full"
                {...register("password", { required: true })}
              />
            </CardBody>
            <CardFooter>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
