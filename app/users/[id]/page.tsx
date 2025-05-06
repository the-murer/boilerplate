"use client";

import NiceModal from "@ebay/nice-modal-react";
import React from "react";

import { User } from "@/types/userTypes";
import UpdateUserModal from "@/modules/users/components/updateUserModal";
import { useParams } from "next/navigation";
import ViewHeader from "@/stories/views/registerView/registerViewHeader";
import { useGetUser } from "@/modules/users/hooks/useGetUser";
import ViewInfoCard from "@/stories/views/registerView/registerViewInfoCard";
import ErrorPage from "@/stories/views/errorView/errorView";

const showUpdateUserModal = (user: User) =>
  NiceModal.show(UpdateUserModal, user);

const UserPage = () => {
  const { id } = useParams();

  if (!id || typeof id !== "string") {
    return (
      <ErrorPage
        error={"Erro ao carregar o usuário, volte para a página de usuários"}
      />
    );
  }
  const { data, isLoading } = useGetUser({ userId: id });

  if ((!data || !data.user) && !isLoading) {
    return <ErrorPage error={"Usuário não encontrado"} />;
  }

  return (
    <>
      <ViewHeader
        title={data?.user?.name}
        subtitle="Visualize os dados do usuário"
        openEditModal={() => showUpdateUserModal(data?.user)}
        isLoading={isLoading}
      />
      <ViewInfoCard
        isLoading={isLoading}
        info={[{ label: "Email", value: data?.user?.email }]}
      />
    </>
  );
};

export default UserPage;
