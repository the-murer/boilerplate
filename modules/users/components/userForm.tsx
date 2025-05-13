import { Form } from "@heroui/react";
import { UseFormReturn } from "react-hook-form";

import Input from "@/ui/stories/components/input/input";
import React from "react";

type UserFormProps = {
  form: UseFormReturn<any, any, undefined>;
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
