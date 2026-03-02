"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      <h1 className="text-4xl font-bold text-[var(--umang-navy)]">Something went wrong</h1>
      <p className="mt-4 max-w-md text-gray-600">
        We encountered an unexpected error. Please try again or go back to the homepage.
      </p>
      <div className="mt-8 flex gap-4">
        <button
          onClick={reset}
          className="rounded-md bg-[var(--umang-navy)] px-6 py-2 text-sm font-medium text-white hover:opacity-90 transition"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-md border border-[var(--umang-navy)] px-6 py-2 text-sm font-medium text-[var(--umang-navy)] hover:bg-gray-50 transition"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
