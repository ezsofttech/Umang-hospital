"use client";

import Link from "next/link";

type Item = {
  id: string;
  title: string;
  date: string;
  href: string;
  badge?: string;
};

type Props = {
  type: "blogs" | "messages";
  items: Item[];
  viewAllHref: string;
  error?: boolean;
};

export default function DashboardRecent({ type, items, viewAllHref, error }: Props) {
  const title = type === "blogs" ? "Recent Blogs" : "Recent Messages";
  const icon = type === "blogs" ? "fi-sr-document" : "fi-sr-envelope";

  return (
    <section className="rounded-xl border border-gray-800 bg-gray-800 p-5 shadow-lg sm:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
            type === "blogs" 
              ? "bg-blue-900 text-blue-400" 
              : "bg-amber-900 text-amber-400"
          }`}>
            <i className={`fi ${icon} text-lg`} />
          </div>
          <h2 className="text-base font-bold text-white">
            {title}
          </h2>
        </div>
        <Link
          href={viewAllHref}
          className="text-sm font-medium text-red-500 transition hover:text-red-400 hover:underline"
        >
          View All →
        </Link>
      </div>
      <ul className="mt-4 space-y-3">
        {error && items.length === 0 && (
          <li className="py-4 text-center text-sm text-gray-400">No data available</li>
        )}
        {!error && items.length === 0 && (
          <li className="py-4 text-center text-sm text-gray-400">
            No {type} yet.
          </li>
        )}
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className="flex items-center justify-between gap-3 rounded-lg border border-transparent px-3 py-2 text-sm transition hover:border-gray-700 hover:bg-gray-700"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-gray-300">{item.title}</p>
              </div>
              <span className="flex shrink-0 items-center gap-2 whitespace-nowrap">
                {item.badge && (
                  <span className="rounded-full bg-green-900 px-2 py-0.5 text-xs font-medium text-green-400">
                    {item.badge}
                  </span>
                )}
                <span className="text-xs text-gray-500">
                  {new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
