import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { EyeIcon, MoreVerticalIcon, PencilIcon, TrashIcon } from "lucide-react";

import React from "react";

type TableActionProps = {
  row: any;
  actionsFunctions: {
    view: () => void;
    edit: () => void;
    delete: () => void;
  };
};

const TableAction = ({ row, actionsFunctions }: TableActionProps) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly variant="bordered" color="default">
          <MoreVerticalIcon className="w-5 h-5" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem
          key="view"
          startContent={<EyeIcon className="w-5 h-5" />}
          onPress={actionsFunctions.view}
        >
          <p>Visualizar</p>
        </DropdownItem>
        <DropdownItem
          key="edit"
          startContent={<PencilIcon className="w-5 h-5" />}
          onPress={actionsFunctions.edit}
        >
          <p>Editar</p>
        </DropdownItem>
        <DropdownItem
          key="delete"
          startContent={<TrashIcon className="w-5 h-5" />}
          onPress={actionsFunctions.delete}
        >
          <p>Excluir</p>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default TableAction;
