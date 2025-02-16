import { signIn } from "next-auth/react";
import Router from "next/router";
import { z } from "zod";


export const useLogin = () => {
  const loginSchema = z.object({
    email: z.string({
      required_error: "Por favor, insira seu email",
    }).email({ message: "Email inválido" }),
    password: z.string({
      required_error: "Por favor, insira sua senha",
    }).min(3, { message: "A senha deve conter pelo menos 3 caracteres" }),
  });

  const onSubmit = async (data: any) => {
    console.log("🚀 data => ", data);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (res?.error) {
        throw new Error(res.error);
      }
      // if (res?.ok) {
      //   Router.push("/dash");
      // }
    } catch (error) {
      console.log("🚀 error => ", error);
    }
  };

  return { loginSchema, onSubmit };
};
