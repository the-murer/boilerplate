import { FilterIcon, PlusIcon } from "lucide-react";
import React, { createContext, useState, ReactNode, useMemo } from "react";
import Collapse from "../../ui/collapse";
import { default as Button } from "./pageHeaderButton";

const PageHeaderContext = createContext<{
  isFilterOpen: boolean;
  toggleFilter: () => void;
} | null>(null);

type PageHeaderProps = {
  title: string;
  subtitle: string;
  openCreateModal: () => void;
  children?: ReactNode;
  filterComponent?: ReactNode;
};

export function PageHeader({
  title,
  subtitle,
  openCreateModal,
  filterComponent,
  children,
}: PageHeaderProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const toggleFilter = () => setIsFilterOpen((prev) => !prev);

  const contextValue = useMemo(
    () => ({
      isFilterOpen,
      toggleFilter,
    }),
    [isFilterOpen]
  );

  return (
    <PageHeaderContext.Provider value={contextValue}>
      <>
        <div className="flex items-start pt-10">
          <div className="flex flex-col gap-2">
            <h1 className="text-5xl font-bold">{title}</h1>
            <p className="text-lg">{subtitle}</p>
          </div>
          <div className="flex items-center justify-center mt-2 ml-5 gap-5">
            <Button onPress={openCreateModal}>
              <PlusIcon className="w-5 h-5" />
            </Button>
            <Button
              onPress={toggleFilter}
              variant={isFilterOpen ? "solid" : "ghost"}
            >
              <FilterIcon className="w-5 h-5" />
            </Button>
            {children}
          </div>
        </div>
      </>
      <div className="my-5">
        <Collapse isOpen={isFilterOpen}>{filterComponent}</Collapse>
      </div>
    </PageHeaderContext.Provider>
  );
}

export default PageHeader;
