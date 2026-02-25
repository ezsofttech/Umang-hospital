"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelLeft } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/blogs": "Blog Management",
  "/admin/blogs/new": "Create Post",
  "/admin/messages": "Messages",
  "/admin/settings": "Settings",
};

function getPageTitle(pathname: string): string {
  if (pageTitles[pathname]) return pageTitles[pathname];
  if (pathname.startsWith("/admin/blogs/") && pathname !== "/admin/blogs/new") return "Edit Post";
  return "Admin";
}

type Props = { collapsed: boolean; onToggleSidebar: () => void };

export default function AdminTopbar({ collapsed, onToggleSidebar }: Props) {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-gray-300 bg-white px-4 shadow-sm sm:px-6">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-gray-300 bg-white text-gray-600 transition duration-300 hover:border-gray-400 hover:text-[var(--umang-navy)] focus:outline-none focus:ring-2 focus:ring-[var(--umang-navy)]/30"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <PanelLeft size={18} strokeWidth={2.5} />
        </button>
        <div className="flex flex-col">
          <h1 className="text-lg font-bold text-[var(--umang-navy)]">
            {getPageTitle(pathname ?? "")}
          </h1>
          <p className="text-xs text-gray-500">Manage your hospital administration</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-[var(--umang-navy)]"
          aria-label="Search"
        >
          <i className="fi fi-sr-search text-lg" aria-hidden />
        </button>
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-[var(--umang-navy)]"
          aria-label="Notifications"
        >
          <i className="fi fi-sr-bell text-lg" aria-hidden />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>
        <Link
          href="/admin/settings"
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--umang-navy)] to-[var(--umang-teal)] text-white transition hover:shadow-md"
          aria-label="Profile"
        >
          <i className="fi fi-sr-user text-lg" aria-hidden />
        </Link>
      </div>
    </header>
  );
}
