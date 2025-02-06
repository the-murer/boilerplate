import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useTheme } from "next-themes";

type TableProps<T> = {
  columns: ColumnDef<T>[];
  data: T[];
};

const Table = <T,>({ columns, data }: TableProps<T>) => {
  const { theme } = useTheme();

  const table = useReactTable({
    data,
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
                  className="px-6 py-4 text-left text-sm font-semibold"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className={`${theme === "dark" ? "bg-gray-900" : "bg-gray-200"}`}>
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
