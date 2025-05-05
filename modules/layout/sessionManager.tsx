"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import LoadingPage from "../default/components/loadingPage";
import useSessionStore from "../auth/sessionStore";
import { User } from "@/types/userTypes";

const SessionManager = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const { setUser } = useSessionStore();

  useEffect(() => {
    if (session) {
      setUser(session.user as User);
    }
  }, [session]);

  if (status === "loading") {
    return <LoadingPage />;
  }

  return <>{children}</>;
};

export default SessionManager;
