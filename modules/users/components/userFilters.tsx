import Input from "@/modules/default/input";
import SubmitButton from "@/modules/default/submitButton";
import { Button } from "@nextui-org/react";
import React from "react";
import { useForm } from "react-hook-form";

type UserFiltersProps = {
  aditionalParams: Record<string, string>;
  setAditionalParams: (params: Record<string, string>) => void;
};

const UserFilters = ({
  aditionalParams,
  setAditionalParams,
}: UserFiltersProps) => {
  const form = useForm({
    defaultValues: aditionalParams,
  });

  const handleFilterSubmit = () => {
    form.handleSubmit((data: any) => {
      setAditionalParams(data);
    })();
  };

  const clearFilters = () => {
    setAditionalParams({});
    form.reset();
  };

  return (
    <form className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="w-1/2">
          <Input
            label="Nome"
            placeholder="Digite o nome do usuário"
            form={form}
            name="name"
          />
        </div>
        <div className="w-1/2">
          <Input
            label="Email"
            placeholder="Digite o email do usuário"
            form={form}
            name="email"
          />
        </div>
      </div>
      <div className="flex gap-4 justify-end">
        <Button variant="ghost" onPress={clearFilters}>
          Limpar
        </Button>
        <Button
          color="primary"
          type="submit"
          onPress={() => handleFilterSubmit()}
        >
          Filtrar
        </Button>
      </div>
    </form>
  );
};

export default UserFilters;
