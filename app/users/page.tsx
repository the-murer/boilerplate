"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import React, { useEffect, useState } from "react";

import CreateUserModal from "@/modules/users/components/createUserModal";
import LoadingTable from "@/modules/default/loadingTable";
import PageHeader from "@/modules/default/pageHeader";
import Pagination from "@/modules/default/pagination";
import Table from "@/modules/default/table";
import TableAction from "@/modules/default/tableAction";
import { User } from "@/types/userTypes";
import { useCreateUser } from "@/modules/users/hooks/useCreateUser";
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

  const showCreateUserModal = () => NiceModal.show(CreateUserModal);

  if (isLoading) return <LoadingTable />;

  return (
    <>
      <PageHeader
        title="Listagem de Usuários"
        subtitle="Veja todos os usuários cadastrados no sistema"
        openCreateModal={showCreateUserModal}
      />
      <Table columns={columns} data={data.users} />
      <Pagination metadata={data.metadata} onPageChange={setPage} />
    </>
  );
};

export default ListUsers;
