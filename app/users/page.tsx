"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";

import LoadingTable from "@/components/default/loadingTable";
import PageHeader from "@/components/default/pageHeader";
import Pagination from "@/components/default/pagination";
import Table from "@/components/default/table";
import TableAction from "@/components/default/tableAction";
import { User } from "@/types/userTypes";
import { useGetUsers } from "@/modules/users/hooks/useGetUsers";

const columnHelper = createColumnHelper<User>();

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

const ListUsers = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useGetUsers({
    page,
    limit,
  });

  if (isLoading) return <LoadingTable />;

  return (
    <>
      <PageHeader
        title="Listagem de Usuários"
        subtitle="Veja todos os usuários cadastrados no sistema"
        createFunction={() => {}}
      />
      <Table columns={columns} data={data.users} />
      <Pagination metadata={data.metadata} onPageChange={setPage} />
    </>
  );
};

export default ListUsers;
