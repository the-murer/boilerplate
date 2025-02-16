"use client";

import { Card, CardHeader } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginForm from "@/modules/auth/components/loginForm";
import { useLogin } from "@/modules/auth/hooks/useLogin";

export default function Login() {
  const { onSubmit, loginSchema } = useLogin();

  const form = useForm({
    resolver: zodResolver(loginSchema),
  });
  

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center p-10">
        <Card style={{ width: "50%" }}>
          <CardHeader className="flex justify-center">
            <h1 className="text-2xl font-bold">Fazer Login</h1>
          </CardHeader>
          <LoginForm form={form} onSubmit={onSubmit} />
        </Card>
      </div>
    </div>
  );
}
