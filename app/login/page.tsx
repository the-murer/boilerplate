"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginForm from "@/modules/auth/components/loginForm";
import { useLogin } from "@/modules/auth/hooks/useLogin";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import {Card, CardHeader, addToast } from "@heroui/react";

export default function Login() {
  const { onSubmit, loginSchema } = useLogin();
  const { data: session } = useSession();

  if (session) {
    addToast({
      title: "Você já está autenticado",
      description: "Você já está autenticado, por favor, faça logout para continuar",
      variant: "error",
    });
    redirect("/");
  }

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
