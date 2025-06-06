import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { User, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User as UserType } from "@/types/userTypes";

const UserMenu = ({ user }: { user: UserType }) => {
  const { replace } = useRouter();

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">
          <User />
          {user?.name}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          key="copy"
          onClick={() => {
            console.log("clicked");
            replace("/profile");
          }}
        >
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Perfil
          </div>
        </DropdownItem>
        <DropdownItem
          key="delete"
          onClick={() => signOut()}
          className="text-danger gap-2"
          color="danger"
        >
          <div className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserMenu;
