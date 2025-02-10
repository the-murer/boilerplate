import { Pagination as NextPagination } from "@nextui-org/react";
import { PaginatedResult } from "@/utils/pagination";
import React from "react";

type PaginationProps = {
  metadata?: PaginatedResult["metadata"];
  onPageChange: (page: number) => void;
};

const Pagination = ({ metadata, onPageChange }: PaginationProps) => {
  
  if (!metadata) return null;
  return (
    <div className="flex items-end justify-end mt-5">
      <NextPagination
        showShadow
        showControls
        total={metadata.totalPages}
        page={metadata.currentPage + 1}
        onChange={(page) => onPageChange(page)}
      />
    </div>
  );
}

export default Pagination