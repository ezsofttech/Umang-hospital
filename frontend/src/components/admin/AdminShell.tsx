"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { X } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import { useAuth } from "@/context/AuthContext";

type Props = { children: React.ReactNode };

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(m.matches);
    update();
    m.addEventListener("change", update);
    return () => m.removeEventListener("change", update);
  }, []);
  return isMobile;
}

export default function AdminShell({ children }: Props) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isMobile) setSidebarCollapsed(true);
  }, [isMobile]);

  // Redirect first-time login users to change password
  useEffect(() => {
    if (!isLoading && isAuthenticated && user?.isFirstLogin && pathname !== "/admin/settings") {
      router.replace("/admin/settings?tab=password&firstLogin=1");
    }
  }, [isLoading, isAuthenticated, user, pathname, router]);

  // Don't wrap login or setup page in the shell
  if (pathname === "/admin/login" || pathname === "/admin/setup") {
    return <>{children}</>;
  }

  // Show loading while verifying auth
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--umang-teal)] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {isMobile && !sidebarCollapsed && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-30 bg-black/40 md:hidden"
            onClick={() => setSidebarCollapsed(true)}
          />
          <button
            type="button"
            aria-label="Close menu"
            className="fixed right-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-lg bg-white text-gray-700 shadow-lg transition hover:bg-gray-100 md:hidden"
            onClick={() => setSidebarCollapsed(true)}
          >
            <X size={20} strokeWidth={2} />
          </button>
        </>
      )}
      <AdminSidebar
        collapsed={sidebarCollapsed}
        onLinkClick={isMobile ? () => setSidebarCollapsed(true) : undefined}
      />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <AdminTopbar
          collapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed((c) => !c)}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
