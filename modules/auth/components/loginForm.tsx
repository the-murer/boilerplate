import React from "react";
import Input from "@/modules/ui/input";

import { Button, CardBody, CardFooter } from "@nextui-org/react";

const LoginForm = ({ form, onSubmit }: any) => {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <CardBody className="flex flex-col gap-4">
        <Input
          label="Email"
          placeholder="Insira seu email"
          type="email"
          form={form}
          name="email"
        />
        <Input
          label="Senha"
          placeholder="Insira sua senha"
          type="password"
          form={form}
          name="password"
        />
      </CardBody>
      <CardFooter>
        <Button type="submit" color="primary" className="w-full">
          Login
        </Button>
      </CardFooter>
    </form>
  );
};

export default LoginForm;
