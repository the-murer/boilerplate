"use client";
import Image from "next/image";

import logo from "@/public/logo_dark.png";
import logo_light from "@/public/logo_light.png";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme } = useTheme();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex flex-col gap-10">
          <Image
            src={theme === "light" ? logo : logo_light}
            alt="logo"
            height={70}
          />
          <p className="text-xl">A nova geração de soluções para seu negócio</p>
        </div>
      </main>
    </div>
  );
}
