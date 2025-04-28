"use client";

import NiceModal from "@ebay/nice-modal-react";
import { SessionProvider } from "next-auth/react";
import {ToastProvider} from "@heroui/toast";

export default function AppDefaultProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ToastProvider />
      <NiceModal.Provider>{children}</NiceModal.Provider>
    </SessionProvider>
  );
}
