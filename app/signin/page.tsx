"use client";

import React from "react";
import { Card, CardHeader } from "@nextui-org/react";
import useUrlParams from "@/modules/default/hooks/useUrlParams";
import { useGetInvite } from "@/modules/auth/hooks/useGetInvite";
import SignInForm from "@/modules/auth/components/signinForm";
import LoadingPage from "@/modules/default/components/loadingPage";
import ErrorPage from "@/modules/default/components/errorPage";
import NotFoundPage from "@/modules/default/components/notFoundPage";

const SignIn = () => {
  const { inviteId } = useUrlParams();
  const { data, isLoading, error } = useGetInvite({ inviteId });

  if (isLoading) return <LoadingPage />;

  if (error) return <ErrorPage error={error} />;

  if (!data || !inviteId)
    return <NotFoundPage message="Não foi possível encontrar o convite" />;

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
