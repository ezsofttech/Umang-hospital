import Link from "next/link";
import { getBlogs } from "@/lib/api";
import BlogsTable from "@/components/admin/BlogsTable";

export default async function AdminBlogsPage() {
  let blogs: Awaited<ReturnType<typeof getBlogs>> = [];
  let error = "";
  try {
    blogs = await getBlogs(false);
  } catch (e) {
    error = "Could not load blogs.";
  }

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

      {error && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          {error}
        </div>
      )}

      <BlogsTable blogs={blogs} />
    </div>
  );
}
