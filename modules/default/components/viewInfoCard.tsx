import { LoadingGradient } from "@/modules/ui/table/loadingTable";
import React from "react";

type RowInfoProps = {
  label: string;
  value: string;
};

type PageHeaderProps = {
  info: RowInfoProps[];
  isLoading: boolean;
};

const ViewInfoRow = ({
  label,
  value,
  isLoading,
}: RowInfoProps & { isLoading: boolean }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 ">
        <LoadingGradient />
        <LoadingGradient />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2 ">
      <p className="text-md text-gray-600 dark:text-gray-400">{label}</p>
      <p className="text-lg text-gray-900 dark:text-gray-100">{value}</p>
    </div>
  );
};

const ViewInfoCard = ({ info, isLoading }: PageHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-lg p-4 my-10 bg-gray-300 dark:bg-gray-800">
      {info.map((item) => (
        <ViewInfoRow
          isLoading={isLoading}
          key={item.label}
          label={item.label}
          value={item.value}
        />
      ))}
    </div>
  );
};

export default ViewInfoCard;
