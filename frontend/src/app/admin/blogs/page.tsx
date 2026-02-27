"use client";

import Link from "next/link";
import { useBlogs } from "@/hooks/useBlog";
import BlogsTable from "@/components/admin/BlogsTable";

export default function AdminBlogsPage() {
  const { data: blogs = [], isLoading, error } = useBlogs(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold text-[var(--umang-navy)] sm:text-2xl">Blog Management</h1>
        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--umang-navy)] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-95"
        >
          <i className="fi fi-sr-plus text-lg" aria-hidden />
          Create New Post
        </Link>
      </div>

      {isLoading && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-center text-gray-600">
          Loading blogs...
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          Could not load blogs.
        </div>
      )}

      {!isLoading && !error && <BlogsTable blogs={blogs} />}
    </div>
  );
}
