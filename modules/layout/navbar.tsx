"use client";

import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import React from "react";
import { ThemeSwitch } from "./themeSwitch";
import Image from "next/image";

import logo from "@/public/logo_dark.png";
import logo_light from "@/public/logo_light.png";
import { useTheme } from "next-themes";
import UserMenu from "./userMenu";
import useSessionStore from "../auth/sessionStore";

const NavBar = () => {
  const { theme } = useTheme();
  const { user } = useSessionStore();

  const routes = user
    ? [
        {
          label: "Home",
          href: "/",
        },
        {
          label: "Usuários",
          href: "/users",
        },
      ]
    : [
        {
          label: "Home",
          href: "/",
        },
      ];

  return (
    <Navbar>
      <NavbarBrand>
        <Link color="foreground" href="/">
          <Image
            src={theme === "light" ? logo : logo_light}
            alt="logo"
            height={32}
          />
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {routes.map((route) => (
          <NavbarItem key={route.href}>
            <Link color="foreground" href={route.href}>
              {route.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        {user ? (
          <NavbarItem className="hidden lg:flex">
            <UserMenu user={user} />
          </NavbarItem>
        ) : (
          <NavbarItem className="hidden lg:flex">
            <Link href="login">Login</Link>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default NavBar;
