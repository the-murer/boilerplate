import { Button } from "@heroui/react";
import { FilterIcon, PlusIcon } from "lucide-react";
import React, { ReactNode, useState } from "react";
import Collapse from "../../components/collapse/collapse";

type PageHeaderProps = {
  title: string;
  subtitle: string;
  openAddModal?: () => void;
  children?: React.ReactNode;
  filterComponent?: React.ReactNode;
};

type PageHeaderButtonProps = {
  onPress: () => void;
  children: React.ReactNode;
  variant?: "ghost" | "solid";
};

const PageHeaderButton = ({
  onPress,
  children,
  ...props
}: PageHeaderButtonProps) => {
  return (
    <Button
      onPress={onPress}
      isIconOnly
      variant="ghost"
      color="primary"
      size="lg"
      {...props}
    >
      {children}
    </Button>
  );
};

const PageHeader = ({
  title,
  subtitle,
  openAddModal,
  filterComponent,
  children,
}: PageHeaderProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  return (
    <>
      <div className="flex items-start pt-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-bold">{title}</h1>
          <p className="text-lg">{subtitle}</p>
        </div>
        <div className="flex items-center justify-center mt-2 ml-5 gap-5">
          {openAddModal && (
            <PageHeader.Button onPress={openAddModal}>
              <PlusIcon className="w-5 h-5" />
            </PageHeader.Button>
          )}
          {filterComponent && (
            <PageHeader.Button
              onPress={toggleFilter}
              variant={isFilterOpen ? "solid" : "ghost"}
            >
              <FilterIcon className="w-5 h-5" />
            </PageHeader.Button>
          )}
          {children}
        </div>
      </div>
      <div className="my-5">
        <Collapse isOpen={isFilterOpen}>{filterComponent}</Collapse>
      </div>
    </>
  );
};

PageHeader.Button = PageHeaderButton;

export default PageHeader;
