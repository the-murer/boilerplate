"use client";

import NiceModal from "@ebay/nice-modal-react";
import React from "react";

import { User } from "@/types/userTypes";
import UpdateUserModal from "@/modules/users/components/updateUserModal";
import ViewHeader from "@/stories/views/registerView/registerViewHeader";
import { useGetUser } from "@/modules/users/hooks/useGetUser";
import ViewInfoCard from "@/stories/views/registerView/registerViewInfoCard";
import ErrorPage from "@/stories/views/errorView/errorView";
import { Button } from "@heroui/react";
import { Edit } from "lucide-react";
import { useAuthenticatedUser } from "@/modules/auth/sessionStore";

const showUpdateUserModal = (user: User) =>
  NiceModal.show(UpdateUserModal, user);

const ProfilePage = () => {
  const user = useAuthenticatedUser();

  return (
    <>
      <ViewHeader
        title={user?.name}
        subtitle="Visualize e edite seus dados"
        openEditModal={() => showUpdateUserModal(user)}
      />
      <ViewInfoCard isLoading={false}>
        <ViewInfoCard.Row
          label="Email"
          value={
            <span className="flex items-center gap-2">
              {user?.email}
              <Button size="sm" color="primary" variant="ghost">
                <Edit size={16} />
              </Button>
            </span>
          }
        />
        <ViewInfoCard.Row
          label="Senha"
          value={
            <span className="flex items-center gap-2">
              {"*********"}
              <Button size="sm" color="primary" variant="ghost">
                <Edit size={16} />
              </Button>
            </span>
          }
        />
      </ViewInfoCard>
    </>
  );
};

export default ProfilePage;
