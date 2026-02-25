"use client";

import Link from "next/link";

type BlogItem = {
  id: string;
  title: string;
  createdAt: string;
};

type Props = {
  data: BlogItem[];
  isLoading?: boolean;
};

export default function BlogsDataTable({ data, isLoading = false }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 sm:px-6">
              Title
            </th>
            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 sm:px-6">
              Created Date
            </th>
            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 sm:px-6">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={3} className="px-5 py-8 text-center text-sm text-gray-500 sm:px-6">
                Loading...
              </td>
            </tr>
          )}
          {!isLoading && data.length === 0 && (
            <tr>
              <td colSpan={3} className="px-5 py-8 text-center text-sm text-gray-500 sm:px-6">
                No blogs found. Create your first blog post.
              </td>
            </tr>
          )}
          {!isLoading && data.map((item) => (
            <tr 
              key={item.id}
              className="border-b border-gray-200 transition hover:bg-gray-50"
            >
              <td className="px-5 py-4 text-sm text-gray-700 sm:px-6 font-medium">
                {item.title}
              </td>
              <td className="px-5 py-4 text-sm text-gray-700 sm:px-6">
                {new Date(item.createdAt).toLocaleDateString('en-US')}
              </td>
              <td className="px-5 py-4 text-sm sm:px-6">
                <Link 
                  href={`/admin/blogs/${item.id}`}
                  className="inline-flex items-center gap-1 text-[var(--umang-teal)] hover:underline"
                >
                  <i className="fi fi-sr-arrow-right" />
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
