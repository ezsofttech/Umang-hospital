"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "fi-sr-home" },
  { href: "/admin/blogs", label: "Blogs", icon: "fi-sr-document" },
  { href: "/admin/blogs/new", label: "Create Post", icon: "fi-sr-plus" },
  { href: "/admin/messages", label: "Messages", icon: "fi-sr-envelope" },
  { href: "/admin/settings", label: "Settings", icon: "fi-sr-settings" },
];

type Props = { collapsed: boolean; onLinkClick?: () => void };

export default function AdminSidebar({ collapsed, onLinkClick }: Props) {
  const pathname = usePathname();

  return (
    <aside
      className={`flex flex-col border-r border-gray-200 bg-white shadow transition-all duration-300 ease-in-out max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:z-40 max-md:w-[260px] max-md:shadow-lg md:relative ${
        collapsed ? "max-md:-translate-x-full md:w-[70px]" : "max-md:translate-x-0 md:w-[260px]"
      }`}
    >
      {/* Logo */}
      <div className={`border-b border-gray-200 py-3 transition-all duration-300 ${collapsed ? "flex items-center justify-center px-3" : "px-4 sm:px-6"}`}>
        <Link href="/admin/dashboard" className={`flex items-center gap-2 ${collapsed ? "justify-center" : ""}`}>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--umang-navy)] to-[var(--umang-teal)] text-white font-bold">
            A
          </div>
          {!collapsed && (
            <span className="text-lg font-bold text-[var(--umang-navy)] transition-opacity duration-300 opacity-100">Admin</span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex min-h-0 flex-1 flex-col overflow-auto py-2">
        <nav className={`space-y-1 transition-all duration-300 ${collapsed ? "px-2" : "px-4 sm:px-6"}`}>
          {menuItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin/dashboard" &&
                pathname.startsWith(item.href) &&
                item.href !== "/admin/blogs/new");
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                onClick={onLinkClick}
                className={`group relative flex items-center gap-3 rounded-lg text-sm font-medium transition duration-200 ${collapsed ? "h-10 w-10 justify-center px-0 py-0" : "px-3 py-2.5 justify-start"} ${
                  isActive
                    ? "bg-gradient-to-r from-[var(--umang-navy)] to-[var(--umang-navy)]/80 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100 hover:text-[var(--umang-navy)]"
                }`}
              >
                <i className={`fi ${item.icon} text-lg shrink-0`} aria-hidden />
                {!collapsed && (
                  <span className="flex-1 transition-opacity duration-300 opacity-100">{item.label}</span>
                )}
                {isActive && !collapsed && (
                  <div className="h-2 w-2 rounded-full bg-white" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className={`mt-auto border-t border-gray-200 pt-4 transition-all duration-300 ${collapsed ? "px-2" : "px-4 sm:px-6"}`}>
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              title={collapsed ? "Logout" : undefined}
              className={`group relative flex items-center gap-3 rounded-lg text-sm font-medium text-gray-600 transition hover:bg-red-100 hover:text-red-600 ${collapsed ? "h-10 w-10 justify-center px-0 py-0" : "w-full px-3 py-2 justify-start"}`}
            >
              <i className="fi fi-sr-exit text-lg shrink-0" aria-hidden />
              {!collapsed && (
                <span className="flex-1 transition-opacity duration-300 opacity-100">Logout</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
