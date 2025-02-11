"use client";

import { ColumnDef } from "@tanstack/react-table";
import NiceModal from "@ebay/nice-modal-react";
import React, { useEffect, useState } from "react";

import CreateUserModal from "@/modules/users/components/createUserModal";
import LoadingTable from "@/modules/default/table/loadingTable";
import PageHeader from "@/modules/default/pageHeader";
import Pagination from "@/modules/default/pagination";
import Table from "@/modules/default/table/table";
import TableAction from "@/modules/default/table/tableAction";
import { User } from "@/types/userTypes";
import { useCreateUser } from "@/modules/users/hooks/useCreateUser";
import { useGetUsers } from "@/modules/users/hooks/useGetUsers";
import ErrorTable from "@/modules/default/table/errorTable";
import { SortEnum } from "@/utils/pagination";
import useUrlParams from "@/modules/default/hooks/useUrlParams";

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Função",
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => (
      <TableAction
        row={row}
        actionsFunctions={{
          view: () => {},
          edit: () => {},
          delete: () => {},
        }}
      />
    ),
  },
];


const LoadingGradient = () => {
  console.log("LoadingGradient");
  return (
    <div
      className={`animate-pulse w-full h-4 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded`}
    />
  );
};


const ListUsers = () => {
  const { page, setPage, limit, sortField, sortOrder, handleSortChange } =
    useUrlParams();

  const { data, isLoading, error } = useGetUsers({
    page,
    limit,
    sortField,
    sortOrder,
  });

  const showCreateUserModal = () => NiceModal.show(CreateUserModal);

  return (
    <>
      <PageHeader
        title="Listagem de Usuários"
        subtitle="Veja todos os usuários cadastrados no sistema"
        openCreateModal={showCreateUserModal}
      />
      <Table
        columns={columns}
        data={data?.users || []}
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

export default ListUsers;
