import { Button, Form } from "@nextui-org/react";
import { FieldValues, UseFormReturn, useForm } from "react-hook-form";

import { CreateUserInputType } from "../hooks/useCreateUser";
import Input from "@/modules/default/input";
import React from "react";

type UserFormProps = {
  form: UseFormReturn<CreateUserInputType, any, undefined>;
};

const UserForm = ({ form }: UserFormProps) => {
  return (
    <div>
      <Input
        form={form}
        label="Nome"
        placeholder="Digite o nome do usuário"
        name="name"
      />
      <Input
        form={form}
        label="Email"
        placeholder="Digite o email do usuário"
        name="email"
      />
    </div>
  );
};

export default UserForm;
