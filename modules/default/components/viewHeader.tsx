import { Button } from "@heroui/react";
import { PencilIcon } from "lucide-react";
import React from "react";
import { LoadingGradient } from "@/modules/ui/table/loadingTable";

type ViewHeaderProps = {
  title: string;
  subtitle: string;
  openEditModal: () => void;
  isLoading?: boolean;
};

const ViewHeader = ({
  title,
  subtitle,
  openEditModal,
  isLoading,
}: ViewHeaderProps) => {

  return (
    <>
      <div className="flex items-start pt-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-bold">{isLoading ? <LoadingGradient /> : title}</h1>
          <p className="text-lg">{subtitle}</p>
        </div>
        <div className="flex items-center justify-center mt-2 ml-5 gap-5">
          <Button
            onPress={openEditModal}
            isIconOnly
            variant="ghost"
            color="primary"
            size="lg"
          >
            <PencilIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default ViewHeader;
