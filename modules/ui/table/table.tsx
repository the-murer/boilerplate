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
import LoadingTable from "./loadingTable";
import ErrorTable from "./errorTable";

type TableProps<T> = {
  columns: ColumnDef<T>[];
  data: T[];
  onSortChange: (sortField: string) => void;
  sortField: string;
  sortOrder: SortEnum;
  isLoading: boolean;
  limit: number;
  error: any;
  onRowClick: (row: T) => void;
};

const SortIcon = ({ sortOrder }: { sortOrder: SortEnum }) => {
  return sortOrder === SortEnum.ASC ? (
    <MoveDown size={16} />
  ) : (
    <MoveUp size={16} />
  );
};

const Table = <T,>({
  columns,
  data,
  onSortChange,
  sortField,
  sortOrder,
  isLoading,
  limit,
  error,
  onRowClick,
}: TableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading)
    return (
      <LoadingTable
        columns={columns}
        sortField={sortField}
        sortOrder={sortOrder}
        limit={limit}
      />
    );

  if (!data || data.length === 0) return <EmptyTable />;
  if (error) return <ErrorTable error={error} />;

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
                  <div
                    onClick={() => onSortChange(header.id)}
                    className="flex items-center gap-2"
                  >
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
              onClick={() => onRowClick(row.original)}
              className="border-t border-gray-300 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-gray-100"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
