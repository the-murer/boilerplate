"use client";

import { ColumnDef } from "@tanstack/react-table";
import NiceModal from "@ebay/nice-modal-react";
import React from "react";

import CreateUserModal from "@/modules/users/components/createUserModal";
import PageHeader from "@/ui/stories/blocks/pageHeader/pageHeader";
import Pagination from "@/ui/stories/blocks/pagination/pagination";
import Table from "@/ui/stories/blocks/table/table";
import TableAction from "@/ui/stories/blocks/table/tableAction";
import { User } from "@/types/userTypes";
import { useGetUsers } from "@/modules/users/hooks/useGetUsers";
import useUrlParams from "@/modules/layout/hooks/usePaginationParams";
import UserFilters from "@/modules/users/components/userFilters";
import UpdateUserModal from "@/modules/users/components/updateUserModal";
import DeleteUserModal from "@/modules/users/components/deleteUserModal";
import ComponentAbilityCheck from "@/modules/auth/componentAbilityCheck";

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
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => (
      <TableAction
        row={row.original}
        actionsFunctions={{
          edit: showUpdateUserModal,
          delete: showDeleteUserModal,
        }}
      />
    ),
  },
];
const showCreateUserModal = () => NiceModal.show(CreateUserModal);
const showUpdateUserModal = (user: User) =>
  NiceModal.show(UpdateUserModal, user);
const showDeleteUserModal = (user: User) =>
  NiceModal.show(DeleteUserModal, user);

const ListUsers = () => {
  const {
    page,
    setPage,
    limit,
    sortField,
    sortOrder,
    handleSortChange,
    aditionalParams,
  } = useUrlParams();

  const { data, isLoading, error } = useGetUsers({
    page,
    limit,
    sortField,
    sortOrder,
    ...aditionalParams,
  });

  return (
    <ComponentAbilityCheck role="User" action="read">
      <PageHeader
        title="Listagem de Usuários"
        subtitle="Veja todos os usuários cadastrados no sistema"
        openAddModal={showCreateUserModal}
        filterComponent={<UserFilters />}
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
    </ComponentAbilityCheck>
  );
};

export default ListUsers;
