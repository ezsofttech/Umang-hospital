"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelLeft, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const pageTitles: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/blogs": "Blog Management",
  "/admin/blogs/new": "Create Post",
  "/admin/messages": "Messages",
  "/admin/settings": "Settings",
  "/admin/staff": "Staff Management",
  "/admin/categories": "Categories",
  "/admin/subcategories": "Subcategories",
  "/admin/doctors": "Doctors",
};

function getPageTitle(pathname: string): string {
  if (pageTitles[pathname]) return pageTitles[pathname];
  if (pathname.startsWith("/admin/blogs/") && pathname !== "/admin/blogs/new") return "Edit Post";
  if (pathname.startsWith("/admin/doctors/")) return "Doctor Profile";
  if (pathname.startsWith("/admin/categories/")) return "Category";
  if (pathname.startsWith("/admin/subcategories/")) return "Subcategory";
  return "Admin";
}

type Props = { collapsed: boolean; onToggleSidebar: () => void };

export default function AdminTopbar({ collapsed, onToggleSidebar }: Props) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
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
        {user && (
          <div className="hidden items-center gap-2 sm:flex">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">{user.name}</p>
              <p className="text-xs capitalize text-gray-400">{user.role}</p>
            </div>
          </div>
        )}
        <Link
          href="/admin/settings"
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--umang-navy)] to-[var(--umang-teal)] text-white transition hover:shadow-md"
          aria-label="Profile / Settings"
          title="Settings"
        >
          <i className="fi fi-sr-user text-lg" aria-hidden />
        </Link>
        <button
          type="button"
          onClick={() => setShowConfirm(true)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 transition hover:bg-red-50 hover:text-red-600"
          aria-label="Logout"
          title="Logout"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>

    {/* Logout Confirmation Modal */}
    {showConfirm && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
          <h2 className="mb-2 text-lg font-bold text-[var(--umang-navy)]">Confirm Logout</h2>
          <p className="mb-6 text-sm text-gray-500">Are you sure you want to logout?</p>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowConfirm(false)}
              className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
            >
              No
            </button>
            <button
              type="button"
              onClick={() => { setShowConfirm(false); logout(); }}
              className="rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-red-700"
            >
              Yes, Logout
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
