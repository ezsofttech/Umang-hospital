import type { Metadata } from "next";
import AdminShell from "@/components/admin/AdminShell";
import "../globals.css";

export const metadata: Metadata = {
  title: "UMANG Hospital Admin",
  description: "Hospital management admin dashboard",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
