import { Button } from "@heroui/react";
import { FilterIcon, PlusIcon } from "lucide-react";
import React, { ReactNode, useState } from "react";
import Collapse from "../../ui/collapse";

type PageHeaderProps = {
  title: string;
  subtitle: string;
  openCreateModal: () => void;
  children?: React.ReactNode;
};

const PageHeader = ({
  title,
  subtitle,
  openCreateModal,
  children,
}: PageHeaderProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  const filterComponent = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === PageHeader.Filter
  );

  const actions = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === PageHeader.Action
  );

  return (
    <>
      <div className="flex items-start pt-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-bold">{title}</h1>
          <p className="text-lg">{subtitle}</p>
        </div>
        <div className="flex items-center justify-center mt-2 ml-5 gap-5">
          {actions}
          <Button
            onPress={openCreateModal}
            isIconOnly
            variant="ghost"
            color="primary"
            size="lg"
          >
            <PlusIcon className="w-5 h-5" />
          </Button>
          <Button
            onPress={toggleFilter}
            isIconOnly
            variant={isFilterOpen ? "solid" : "ghost"}
            color="primary"
            size="lg"
          >
            <FilterIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <div className="my-5">
        <Collapse isOpen={isFilterOpen}>{filterComponent}</Collapse>
      </div>
    </>
  );
};

PageHeader.Filter = function Filter({ children }: { children: ReactNode }) {
  return <>{children}</>;
};

PageHeader.Action = function Action({ children }: { children: ReactNode }) {
  return <>{children}</>;
};

export default PageHeader;
