import React, { useEffect } from "react";
import Input from "@/stories/components/input/input";

import { Button, CardBody, CardFooter } from "@heroui/react";
import { useForm } from "react-hook-form";
import { useSignin } from "../hooks/useSignin";
import { Invite } from "@/types/inviteTypes";

type SignInFormProps = {
  invite: Invite;
};

const SignInForm = ({ invite }: SignInFormProps) => {
  const { resolver, onSubmit } = useSignin();

  const form = useForm({ resolver });

  useEffect(() => {
    if (invite) form.setValue("email", invite?.email);
  }, [invite]);


  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <CardBody className="flex flex-col gap-4">
        <Input
          label="Email"
          disabled={true}
          placeholder="Email"
          type="email"
          form={form}
          name="email"
        />
        <Input
          label="Nome"
          placeholder="Insira seu nome"
          type="text"
          form={form}
          name="name"
        />
        <div className="flex flex-row gap-2">
          <Input
            label="Senha"
            placeholder="Insira sua senha"
            type="password"
            form={form}
            name="password"
          />
          <Input
            label="Confirmar senha"
            placeholder="Insira a senha novamente"
            type="password"
            form={form}
            name="confirmPassword"
          />
        </div>
      </CardBody>
      <CardFooter>
        {form.formState.errors && (
          <p className="text-red-500">{form?.formState?.errors?.root?.message}</p>
        )}
        <Button type="submit" color="primary" className="w-full">
          Criar conta
        </Button>
      </CardFooter>
    </form>
  );
};

export default SignInForm;
