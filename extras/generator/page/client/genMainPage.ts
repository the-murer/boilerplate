import { BaseObject } from "../..";

export function generateMainPageFile(obj: BaseObject) {
  const { entity, path, model } = obj;

  console.log(entity.pascalCase());
  const page = `
"use client";

import { ColumnDef } from "@tanstack/react-table";
import NiceModal from "@ebay/nice-modal-react";
import React from "react";

import PageHeader from "@/ui/stories/blocks/pageHeader/pageHeader";
import Pagination from "@/ui/stories/blocks/pagination/pagination";
import Table from "@/ui/stories/blocks/table/table";
import useUrlParams from "@/modules/layout/hooks/usePaginationParams";
import ComponentAbilityCheck from "@/modules/auth/componentAbilityCheck";
import TableAction from "@/ui/stories/blocks/table/tableAction";
import { ${entity.pascalCase()} } from "@/types/${entity}Types";
import { useGet${entity.pluralPascal()} } from "@/modules/${entity}/hooks/useGet${entity.pluralPascal()}";
import ${entity.pascalCase()}Filters from "@/modules/${entity}/components/${entity.camelCase()}Filters";
import Create${entity.pascalCase()}Modal from "@/modules/${entity}/components/create${entity.pascalCase()}Modal";
import Update${entity.pascalCase()}Modal from "@/modules/${entity}/components/update${entity.pascalCase()}Modal";
import Delete${entity.pascalCase()}Modal from "@/modules/${entity}/components/delete${entity.pascalCase()}Modal";

const columns: ColumnDef<${entity.pascalCase()}>[] = [
  ${Object.keys(model).map((field) => `{
    accessorKey: "${field}",
    header: "${field}",
  },`).join("\n")}
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => (
      <TableAction
        row={row.original}
        actionsFunctions={{
          edit: showUpdate${entity.pascalCase()}Modal,
          delete: showDelete${entity.pascalCase()}Modal,
        }}
      />
    ),
  },
];
const showCreate${entity.pascalCase()}Modal = () => NiceModal.show(Create${entity.pascalCase()}Modal);
const showUpdate${entity.pascalCase()}Modal = (${entity.pascalCase()}: ${entity.pascalCase()}) =>
  NiceModal.show(Update${entity.pascalCase()}Modal, ${entity.pascalCase()});
const showDelete${entity.pascalCase()}Modal = (${entity.pascalCase()}: ${entity.pascalCase()}) =>
  NiceModal.show(Delete${entity.pascalCase()}Modal, ${entity.pascalCase()});

const List${entity.pascalCase()} = () => {
  const {
    page,
    setPage,
    limit,
    sortField,
    sortOrder,
    handleSortChange,
    aditionalParams,
  } = useUrlParams();

  const { data, isLoading, error } = useGet${entity.pluralPascal()}({
    page,
    limit,
    sortField,
    sortOrder,
    ...aditionalParams,
  });

  return (
    <ComponentAbilityCheck role="${entity.pascalCase()}" action="read">
      <PageHeader
        title="Listagem de ${entity.pascalCase()}"
        subtitle="Veja todos os ${entity.pascalCase()} cadastrados no sistema"
        openAddModal={showCreate${entity.pascalCase()}Modal}
        filterComponent={<${entity.pascalCase()}Filters />}
      />

      <Table
        columns={columns}
        data={data?.${entity.pluralCamel()} || []}
        onSortChange={handleSortChange}
        sortField={sortField}
        sortOrder={sortOrder}
        isLoading={isLoading}
        error={error}
        limit={limit}
      />
      <Pagination metadata={data?.metadata} onPageChange={setPage} />
    </ComponentAbilityCheck>
  );
};

export default List${entity.pascalCase()};
  `;
  return page;
}
