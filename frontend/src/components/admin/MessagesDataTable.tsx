"use client";

import Link from "next/link";

type MessageItem = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  read: boolean;
};

type Props = {
  data: MessageItem[];
  isLoading?: boolean;
};

export default function MessagesDataTable({ data, isLoading = false }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 sm:px-6">
              Name
            </th>
            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 sm:px-6">
              Email
            </th>
            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 sm:px-6">
              Date
            </th>
            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 sm:px-6">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={4} className="px-5 py-8 text-center text-sm text-gray-500 sm:px-6">
                Loading...
              </td>
            </tr>
          )}
          {!isLoading && data.length === 0 && (
            <tr>
              <td colSpan={4} className="px-5 py-8 text-center text-sm text-gray-500 sm:px-6">
                No messages found.
              </td>
            </tr>
          )}
          {!isLoading && data.map((item) => (
            <tr 
              key={item.id}
              className="border-b border-gray-200 transition hover:bg-gray-50"
            >
              <td className="px-5 py-4 text-sm text-gray-700 sm:px-6 font-medium">
                {item.name}
              </td>
              <td className="px-5 py-4 text-sm text-gray-700 sm:px-6">
                {item.email}
              </td>
              <td className="px-5 py-4 text-sm text-gray-700 sm:px-6">
                {new Date(item.createdAt).toLocaleDateString('en-US')}
              </td>
              <td className="px-5 py-4 text-sm sm:px-6">
                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                  item.read ? "bg-gray-100 text-gray-700" : "bg-green-100 text-green-700"
                }`}>
                  {item.read ? "Read" : "Unread"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
