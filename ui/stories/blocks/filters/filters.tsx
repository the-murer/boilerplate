import Input from "@/ui/stories/components/input/input";
import { Button } from "@heroui/react";
import React from "react";
import { useForm } from "react-hook-form";

type FiltersProps = {
  aditionalParams: Record<string, string>;
  setAditionalParams: (params: Record<string, string>) => void;
  children: React.ReactNode;
};

const Filters = ({
  aditionalParams,
  setAditionalParams,
  children,
}: FiltersProps) => {
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
      {children}
      <Filters.Row className="justify-end">
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
      </Filters.Row>
    </form>
  );
};

Filters.Row = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <div className={`flex gap-4 ${className}`}>{children}</div>;
};

Filters.Column = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-1/2">{children}</div>;
};

export default Filters;
