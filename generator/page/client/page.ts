import { BaseObject } from "@/generator/default";

export function generatePageFile(obj: BaseObject) {
  const { entity, path, model } = obj;
  const { pascalCase, camelCase, pluralPascal, pluralCamel } = entity;

  const page = `
"use client";

import { ColumnDef } from "@tanstack/react-table";
import NiceModal from "@ebay/nice-modal-react";
import React from "react";

import Create${pascalCase}Modal from "@/modules/${camelCase}/components/create${pascalCase}Modal";
import PageHeader from "@/modules/default/components/pageHeader";
import Pagination from "@/modules/default/components/pagination";
import Table from "@/modules/ui/table/table";
import TableAction from "@/modules/ui/table/tableAction";
import { ${pascalCase} } from "@/types/${camelCase}Types";
import { useGet${pluralPascal} } from "@/modules/${camelCase}/hooks/useGet${pluralPascal}";
import useUrlParams from "@/modules/default/hooks/usePaginationParams";
import ${pascalCase}Filters from "@/modules/${camelCase}/components/${camelCase}Filters";
import Update${pascalCase}Modal from "@/modules/${camelCase}/components/update${pascalCase}Modal";
import Delete${pascalCase}Modal from "@/modules/${camelCase}/components/delete${pascalCase}Modal";

const columns: ColumnDef<${pascalCase}>[] = [
  ${Object.keys(model)
    .map(
      (field) => `{
    accessorKey: "${field}",
    header: "${field}",
  },`
    )
    .join("\n")}
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => (
      <TableAction
        row={row.original}
        actionsFunctions={{
          edit: showUpdate${pascalCase}Modal,
          delete: showDelete${pascalCase}Modal,
        }}
      />
    ),
  },
];
const showCreate${pascalCase}Modal = () => NiceModal.show(Create${pascalCase}Modal);
const showUpdate${pascalCase}Modal = (${camelCase}: ${pascalCase}) =>
  NiceModal.show(Update${pascalCase}Modal, ${camelCase});
const showDelete${pascalCase}Modal = (${camelCase}: ${pascalCase}) =>
  NiceModal.show(Delete${pascalCase}Modal, ${camelCase});

const List${pluralPascal} = () => {
  const {
    page,
    setPage,
    limit,
    sortField,
    sortOrder,
    handleSortChange,
    aditionalParams,
    setAditionalParams,
  } = useUrlParams();

  const { data, isLoading, error } = useGet${pluralPascal}({
    page,
    limit,
    sortField,
    sortOrder,
    ...aditionalParams,
  });

  return (
    <>
      <PageHeader
        title="Listagem de Usuários"
        subtitle="Veja todos os usuários cadastrados no sistema"
        openCreateModal={showCreate${pascalCase}Modal}
      >
        <${pascalCase}Filters
          aditionalParams={aditionalParams}
          setAditionalParams={setAditionalParams}
        />
      </PageHeader>

      <Table
        columns={columns}
        data={data?.${pluralCamel} || []}
        onSortChange={handleSortChange}
        sortField={sortField}
        sortOrder={sortOrder}
        isLoading={isLoading}
        error={error}
        limit={limit}
      />
      <Pagination metadata={data?.metadata} onPageChange={setPage} />
    </>
  );
};

export default List${pluralPascal};
  `;
  return page;
}
