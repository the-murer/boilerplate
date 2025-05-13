import Filters from "@/ui/stories/blocks/filters/filters";
import Input from "@/ui/stories/components/input/input";
import { Button } from "@heroui/react";
import React from "react";
import { useForm } from "react-hook-form";
import useUrlParams from "@/modules/layout/hooks/usePaginationParams";

const UserFilters = () => {
  const { aditionalParams, setAditionalParams } = useUrlParams();

  const form = useForm({
    defaultValues: aditionalParams,
  });

  return (
    <Filters
      aditionalParams={aditionalParams}
      setAditionalParams={setAditionalParams}
    >
      <Filters.Row>
        <Filters.Column>
          <Input
            label="Nome"
            placeholder="Digite o nome do usuário"
            form={form}
            name="name"
          />
        </Filters.Column>
        <Filters.Column>
          <Input
            label="Email"
            placeholder="Digite o email do usuário"
            form={form}
            name="email"
          />
        </Filters.Column>
      </Filters.Row>
    </Filters>
  );
};

export default UserFilters;
