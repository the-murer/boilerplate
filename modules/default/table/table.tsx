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
}: TableProps<T>) => {
  const { theme } = useTheme();

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
                  <div
                    onClick={() => onSortChange(header.id)}
                    className="flex flex-row items-center gap-2"
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
