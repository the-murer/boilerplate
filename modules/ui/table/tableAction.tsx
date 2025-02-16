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
    view?: Function;
    edit?: Function;
    delete?: Function;
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
        {actionsFunctions.view !== undefined ? (
          <DropdownItem
            key="view"
            startContent={<EyeIcon className="w-5 h-5" />}
            onPress={() => actionsFunctions.view?.(row)}
          >
            <p>Visualizar</p>
          </DropdownItem>
        ) : null}
        {actionsFunctions.edit !== undefined ? (
          <DropdownItem
            key="edit"
            startContent={<PencilIcon className="w-5 h-5" />}
            onPress={() => actionsFunctions.edit?.(row)}
          >
            <p>Editar</p>
          </DropdownItem>
        ) : null}
        {actionsFunctions.delete !== undefined ? (
          <DropdownItem
            key="delete"
            startContent={<TrashIcon className="w-5 h-5" />}
            onPress={() => actionsFunctions.delete?.(row)}
          >
            <p>Excluir</p>
          </DropdownItem>
        ) : null}
      </DropdownMenu>
    </Dropdown>
  );
};

export default TableAction;
