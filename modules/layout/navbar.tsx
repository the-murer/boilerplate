"use client";

import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

import React from "react";
import { ThemeSwitch } from "./themeSwitch";
import Image from "next/image";

import logo from "@/public/logo_dark.png";
import logo_light from "@/public/logo_light.png";
import { useTheme } from "next-themes";

const NavBar = () => {
  const { theme } = useTheme();

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
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" href="users">
            Usuários
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Link href="login">Login</Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavBar;
