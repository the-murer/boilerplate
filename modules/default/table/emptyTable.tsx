import { Button } from "@nextui-org/react";
import React from "react";
import useUrlParams from "../hooks/useUrlParams";

const EmptyTable = () => {
  const { clearFilters } = useUrlParams();
  return (
    <div className="rounded-lg overflow-hidden">
      <div className="w-full bg-gray-200 dark:bg-gray-900 p-8">
        <div className="flex justify-center items-center min-h-[200px] flex-col gap-4">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Nenhum registro encontrado
          </p>
          <Button color="primary" variant="solid" onPress={clearFilters}>
            Limpar filtros
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmptyTable;
