"use client";

import Link from "next/link";

type TableColumn = {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
  width?: string;
};

type Props = {
  columns: TableColumn[];
  data: any[];
  isLoading?: boolean;
  emptyMessage?: string;
};

export default function DataTable({ 
  columns, 
  data, 
  isLoading = false,
  emptyMessage = "No data available"
}: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            {columns.map((col) => (
              <th
                key={col.key}
                style={{ width: col.width }}
                className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 sm:px-6"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={columns.length} className="px-5 py-8 text-center text-sm text-gray-500 sm:px-6">
                Loading...
              </td>
            </tr>
          )}
          {!isLoading && data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-5 py-8 text-center text-sm text-gray-500 sm:px-6">
                {emptyMessage}
              </td>
            </tr>
          )}
          {!isLoading && data.length > 0 && data.map((row, idx) => (
            <tr 
              key={idx}
              className="border-b border-gray-200 transition hover:bg-gray-50"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-5 py-4 text-sm text-gray-700 sm:px-6"
                >
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
