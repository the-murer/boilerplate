import "@/utils/globals.css";

import { Geist, Geist_Mono } from "next/font/google";

import type { Metadata } from "next";
import ModalProvider from "@/modules/layout/modalProvider";
import NavBar from "@/modules/layout/navbar";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import QueryProvider from "@/modules/layout/queryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nex Gen",
  description: "Nex Gen Boilerplate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <ModalProvider>
            <NextThemesProvider attribute="class" defaultTheme="light">
              <NavBar />
              <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-7xl">
                {children}
              </div>
            </NextThemesProvider>
          </ModalProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
