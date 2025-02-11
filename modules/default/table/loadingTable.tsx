import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useTheme } from "next-themes";
import EmptyTable from "./emptyTable";
import { SortEnum } from "@/utils/pagination";
import { MoveDown, MoveUp } from "lucide-react";
import { memo, useMemo } from "react";

const SortIcon = ({ sortOrder }: { sortOrder: SortEnum }) => {
  return sortOrder === SortEnum.ASC ? (
    <MoveDown size={16} />
  ) : (
    <MoveUp size={16} />
  );
};

const LoadingGradient = memo(() => (
  <div className="animate-pulse w-full h-4 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded" />
));

type TableProps<T> = {
  columns: ColumnDef<T>[];
  sortField: string;
  sortOrder: SortEnum;
  limit: number;
};

const LoadingTable = ({
  columns,
  sortField,
  sortOrder,
  limit,
}: TableProps<any>) => {
  const { theme } = useTheme();

  const table = useReactTable({
    data: Array.from({ length: limit }, (_, index) => ({ id: index })),
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-lg overflow-hidden">
      <table className="w-full border-collapse">
        <thead
          className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-300"}`}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-4 text-left text-sm font-semibold cursor-pointer select-none"
                >
                  <div className="flex flex-row items-center gap-2">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {sortField === header.id && header.id !== "action" && (
                      <SortIcon sortOrder={sortOrder} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          className={`${theme === "dark" ? "bg-gray-900" : "bg-gray-200"}`}
        >
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={`border-t ${
                theme === "dark"
                  ? "border-gray-700 hover:bg-gray-800"
                  : "border-gray-200 hover:bg-gray-300"
              }`}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4 text-sm">
                  <LoadingGradient />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoadingTable;
