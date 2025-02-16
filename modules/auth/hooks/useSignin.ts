import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Router from "next/router";
import { z } from "zod";


export const useSignin = () => {
  const signinSchema = z.object({
    email: z.string({
      required_error: "Por favor, insira seu email",
    }).email({ message: "Email inválido" }),
    name: z.string({
      required_error: "Por favor, insira seu nome",
    }).min(3, { message: "O nome deve conter pelo menos 3 caracteres" }),
    password: z.string({
      required_error: "Por favor, insira sua senha",
    }).min(3, { message: "A senha deve conter pelo menos 3 caracteres" }),
    confirmPassword: z.string({
      required_error: "Por favor, insira sua senha novamente",
    }).min(3, { message: "A senha deve conter pelo menos 3 caracteres" }),
  });

  const onSubmit = async (data: any, second: any) => {
    console.log("🚀 ~ onSubmit ~ second => ", second);
    console.log("🚀 ~ onSubmit ~ data.confirmPassword => ", data.confirmPassword);
    console.log("🚀 ~ onSubmit ~ data.password => ", data.password);
    if (data.password !== data.confirmPassword) {
      throw new Error("As senhas não coincidem");
    }
    console.log("🚀 data => ", data);
    // try {
    //   const res = await signIn("credentials", {
    //     redirect: false,
    //     email: data.email,
    //     password: data.password,
    //   });

    //   if (res?.error) {
    //     throw new Error(res.error);
    //   }
    //   // if (res?.ok) {
    //   //   Router.push("/dash");
    //   // }
    // } catch (error) {
    //   console.log("🚀 error => ", error);
    // }
  };

  const resolver = zodResolver(signinSchema);

  return { resolver, onSubmit };
};
