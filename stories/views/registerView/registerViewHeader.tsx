import { LoadingGradient } from "@/stories/blocks/table/loadingTable";
import { Button } from "@heroui/react";
import { PencilIcon } from "lucide-react";
import React from "react";

type RegisterViewHeaderProps = {
  title: string;
  subtitle: string;
  openEditModal: () => void;
  isLoading?: boolean;
};

const RegisterViewHeader = ({
  title,
  subtitle,
  openEditModal,
  isLoading,
}: RegisterViewHeaderProps) => {
  return (
    <>
      <div className="flex items-start pt-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-bold">
            {isLoading ? <LoadingGradient /> : title}
          </h1>
          <p className="text-lg">{subtitle}</p>
        </div>
        <div className="flex items-center justify-center mt-2 ml-5 gap-5">
          {openEditModal && (
            <Button
              onPress={openEditModal}
              isIconOnly
              variant="ghost"
              color="primary"
              size="lg"
            >
              <PencilIcon className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default RegisterViewHeader;
