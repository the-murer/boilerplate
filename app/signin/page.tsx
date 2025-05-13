"use client";

import React from "react";
import { Card, CardHeader } from "@heroui/react";
import useUrlParams from "@/modules/layout/hooks/useUrlParams";
import { useGetInvite } from "@/modules/auth/hooks/useGetInvite";
import SignInForm from "@/modules/auth/components/signinForm";
import LoadingView from "@/ui/stories/views/loadingView/loadingView";
import ErrorView from "@/ui/stories/views/errorView/errorView";
import NotFoundView from "@/ui/stories/views/notFoundView/notFoundView";

const SignIn = () => {
  const { inviteId } = useUrlParams();
  const { data, isLoading, error } = useGetInvite({ inviteId });

  if (isLoading) return <LoadingView />;

  if (error) return <ErrorView error={error} />;

  if (!data || !inviteId)
    return <NotFoundView message="Não foi possível encontrar o convite" />;

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center p-10">
        <Card style={{ width: "50%" }}>
          <CardHeader className="flex justify-center">
            <h1 className="text-2xl font-bold">Criar conta</h1>
          </CardHeader>
          <SignInForm invite={data} />
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
