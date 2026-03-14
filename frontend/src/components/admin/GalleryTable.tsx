"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Gallery } from "@/types";
import { useDeleteGallery } from "@/hooks/useGallery";
import EmptyState from "./EmptyState";
import ConfirmDialog from "./ConfirmDialog";
import { API_URL } from "@/lib/config";

const PER_PAGE = 10;

type Props = { gallery: Gallery[] };

function imageSrc(url: string | null | undefined) {
  if (!url) return null;
  return url.startsWith("http") ? url : `${API_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

export default function GalleryTable({ gallery: initialGallery }: Props) {
  const [gallery, setGallery] = useState(initialGallery);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const deleteMutation = useDeleteGallery();

  const filtered = useMemo(() => {
    if (!search.trim()) return gallery;
    const q = search.toLowerCase();
    return gallery.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        (g.caption && g.caption.toLowerCase().includes(q))
    );
  }, [gallery, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = useMemo(
    () => filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE),
    [filtered, page]
  );

  async function handleDelete(id: string) {
    try {
      await deleteMutation.mutateAsync(id);
      setGallery((prev) => prev.filter((g) => g.id !== id));
      setDeleteId(null);
    } catch {
      setDeleteId(null);
    }
  }

  if (gallery.length === 0) {
    return (
      <EmptyState
        icon="fi-sr-images"
        title="No gallery items yet"
        description="Add your first gallery image to get started."
      />
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Search by title or caption..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[var(--umang-teal)] focus:ring-1 focus:ring-[var(--umang-teal)]"
        />
      </div>

      {paginated.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Image</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Title</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Order</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginated.map((g) => (
                <tr key={g.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {g.image ? (
                      <img
                        src={imageSrc(g.image) ?? g.image}
                        alt={g.title}
                        className="h-12 w-12 rounded object-cover"
                      />
                    ) : (
                      <span className="text-gray-400 text-xs">No image</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900 max-w-[200px] truncate" title={g.title}>
                    {g.title}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{g.order}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${
                        g.published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {g.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/gallery/${g.id}`}
                        className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                      >
                        <i className="fi fi-sr-edit" aria-hidden />
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => setDeleteId(g.id)}
                        className="inline-flex items-center gap-1 rounded-md border border-red-300 bg-red-50 px-2.5 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100"
                      >
                        <i className="fi fi-sr-trash" aria-hidden />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {paginated.length === 0 && search && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-600">
          No gallery items match your search.
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3">
          <p className="text-xs text-gray-600">
            Showing{" "}
            <span className="font-semibold">{(page - 1) * PER_PAGE + 1}</span> to{" "}
            <span className="font-semibold">{Math.min(page * PER_PAGE, filtered.length)}</span> of{" "}
            <span className="font-semibold">{filtered.length}</span>
          </p>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`rounded-lg px-2.5 py-1.5 text-xs font-medium ${
                  p === page ? "bg-[var(--umang-teal)] text-white" : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        title="Delete gallery item?"
        message="This action cannot be undone."
        confirmLabel="Delete"
        danger
        onConfirm={() => deleteId && handleDelete(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
