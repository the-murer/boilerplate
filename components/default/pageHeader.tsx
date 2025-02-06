import { Button } from "@nextui-org/react";
import { PlusIcon } from "lucide-react";
import React from "react";

type PageHeaderProps = {
  title: string;
  subtitle: string;
  createFunction: () => void;
};

const PageHeader = ({ title, subtitle, createFunction }: PageHeaderProps) => {
  return (
    <div className="flex items-start py-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-5xl font-bold">{title}</h1>
        <p className="text-lg">{subtitle}</p>
      </div>
      <div className="flex items-center justify-center mt-2 ml-5">
        <Button onPress={createFunction} isIconOnly variant="ghost" color="primary" size="lg">
          <PlusIcon className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default PageHeader;
