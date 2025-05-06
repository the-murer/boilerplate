import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { SortEnum } from "@/utils/pagination";
import { MoveDown, MoveUp } from "lucide-react";
import { memo } from "react";

const SortIcon = ({ sortOrder }: { sortOrder: SortEnum }) => {
  return sortOrder === SortEnum.ASC ? (
    <MoveDown size={16} />
  ) : (
    <MoveUp size={16} />
  );
};

export const LoadingGradient = memo(() => (
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
  const table = useReactTable({
    data: Array.from({ length: limit }, (_, index) => ({ id: index })),
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-lg overflow-hidden">
      <table className="w-full border-collapse">
        <thead className="bg-gray-300 dark:bg-gray-800">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-gray-400/50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                >
                  <div className="flex items-center gap-2">
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
        <tbody className="bg-gray-200 dark:bg-gray-900">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-t border-gray-300 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-gray-100"
                >
                  {" "}
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
