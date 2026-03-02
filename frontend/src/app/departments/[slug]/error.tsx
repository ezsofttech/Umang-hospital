"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DepartmentError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Department page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white">
      <Header currentPath="/departments" />
      <main className="flex flex-col items-center justify-center py-32 px-4 text-center">
        <h1 className="text-4xl font-bold text-[var(--umang-navy)]">Failed to load department</h1>
        <p className="mt-4 max-w-md text-gray-600">
          We could not load this department. Please try again or browse all departments.
        </p>
        <div className="mt-8 flex gap-4">
          <button
            onClick={reset}
            className="rounded-md bg-[var(--umang-navy)] px-6 py-2 text-sm font-medium text-white hover:opacity-90 transition"
          >
            Try again
          </button>
          <Link
            href="/departments"
            className="rounded-md border border-[var(--umang-navy)] px-6 py-2 text-sm font-medium text-[var(--umang-navy)] hover:bg-gray-50 transition"
          >
            All Departments
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
