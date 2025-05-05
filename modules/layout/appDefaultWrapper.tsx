"use client";

import NiceModal from "@ebay/nice-modal-react";
import { SessionProvider } from "next-auth/react";
import { ToastProvider } from "@heroui/toast";
import SessionManager from "./sessionManager";

export default function AppDefaultWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ToastProvider />
      <NiceModal.Provider>
        <SessionManager>{children}</SessionManager>
      </NiceModal.Provider>
    </SessionProvider>
  );
}
