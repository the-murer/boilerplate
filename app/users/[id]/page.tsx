"use client";

import NiceModal from "@ebay/nice-modal-react";
import React from "react";

import { User } from "@/types/userTypes";
import UpdateUserModal from "@/modules/users/components/updateUserModal";
import { useParams } from "next/navigation";
import { useGetUser } from "@/modules/users/hooks/useGetUser";
import ViewInfoCard from "@/stories/views/registerView/registerViewInfoCard";
import ErrorPage from "@/stories/views/errorView/errorView";
import PageHeader from "@/stories/blocks/pageHeader/pageHeader";
import { PencilIcon } from "lucide-react";

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
      <PageHeader
        title={data?.user?.name}
        subtitle="Visualize os dados do usuário"
      >
        <PageHeader.Button onPress={() => showUpdateUserModal(data?.user)}>
          <PencilIcon className="w-5 h-5" />
        </PageHeader.Button>
      </PageHeader>
      <ViewInfoCard
        isLoading={isLoading}
        info={[{ label: "Email", value: data?.user?.email }]}
      />
    </>
  );
};

export default UserPage;
