"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Blog } from "@/types";
import { useDeleteBlog } from "@/hooks/useBlog";
import EmptyState from "./EmptyState";
import ConfirmDialog from "./ConfirmDialog";

const PER_PAGE = 10;

type Props = { blogs: Blog[] };

export default function BlogsTable({ blogs: initialBlogs }: Props) {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const deleteMutation = useDeleteBlog();

  const filtered = useMemo(() => {
    if (!search.trim()) return blogs;
    const q = search.toLowerCase();
    return blogs.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.slug.toLowerCase().includes(q)
    );
  }, [blogs, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = useMemo(
    () => filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE),
    [filtered, page]
  );

  async function handleDelete(id: string) {
    try {
      await deleteMutation.mutateAsync(id);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      setDeleteId(null);
    } catch {
      setDeleteId(null);
    }
  }

  if (blogs.length === 0) {
    return (
      <EmptyState
        icon="fi-sr-document"
        title="No blogs yet"
        description="Create your first post to get started."
      />
    );
  }

  return (
    <>
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-4 py-3 sm:px-6">
          <div className="relative">
            <i className="fi fi-sr-search absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" aria-hidden />
            <input
              type="search"
              placeholder="Search by title or slug..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm text-gray-800 outline-none transition focus:border-[var(--umang-teal)] focus:ring-1 focus:ring-[var(--umang-teal)]"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-10 px-4 py-3 text-left sm:px-6">
                  <span className="sr-only">Select</span>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 sm:px-6">
                  Title
                </th>
                <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 sm:table-cell sm:px-6">
                  Slug
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 sm:px-6">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 sm:px-6">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-600 sm:px-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {paginated.map((b) => (
                <tr
                  key={b.id}
                  className="transition hover:bg-gray-50"
                >
                  <td className="w-10 px-4 py-3 sm:px-6">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-[var(--umang-teal)]" aria-label={`Select ${b.title}`} />
                  </td>
                  <td className="px-4 py-3 sm:px-6">
                    <Link
                      href={`/admin/blogs/${b.id}`}
                      className="font-medium text-[var(--umang-navy)] hover:text-[var(--umang-teal)] hover:underline"
                    >
                      {b.title}
                    </Link>
                  </td>
                  <td className="hidden px-4 py-3 text-sm text-gray-600 sm:table-cell sm:px-6">
                    {b.slug}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 sm:px-6">
                    {new Date(b.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 sm:px-6">
                    <span
                      className={`inline-flex rounded-lg px-2 py-1 text-xs font-medium ${
                        b.published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {b.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right sm:px-6">
                    <div className="flex items-center justify-end gap-2">
                      {b.published && (
                        <Link
                          href={`/blogs/${b.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-[var(--umang-teal)]"
                          title="View"
                        >
                          <i className="fi fi-sr-eye h-4 w-4" aria-hidden />
                        </Link>
                      )}
                      <Link
                        href={`/admin/blogs/${b.id}`}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-[var(--umang-teal)]"
                        title="Edit"
                      >
                        <i className="fi fi-sr-pen h-4 w-4" aria-hidden />
                      </Link>
                      <button
                        type="button"
                        onClick={() => setDeleteId(b.id)}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                        title="Delete"
                      >
                        <i className="fi fi-sr-trash h-4 w-4" aria-hidden />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
            <p className="text-sm text-gray-600">
              Page {page} of {totalPages} ({filtered.length} items)
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={deleteId !== null}
        title="Delete blog post"
        message="Are you sure you want to delete this post? This cannot be undone."
        confirmLabel="Delete"
        danger
        onConfirm={() => deleteId && handleDelete(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </>
  );
}
