"use client";

import { useState, useMemo } from "react";
import type { Message } from "@/lib/api";
import { markMessageRead, deleteMessage } from "@/lib/api";
import EmptyState from "./EmptyState";
import ConfirmDialog from "./ConfirmDialog";

const PER_PAGE = 10;
const PREVIEW_LEN = 50;

function preview(text: string, maxLen: number) {
  const t = text.trim();
  if (t.length <= maxLen) return t;
  return t.slice(0, maxLen) + "…";
}

type Props = { initialMessages: Message[] };

export default function AdminMessageList({ initialMessages }: Props) {
  const [messages, setMessages] = useState(initialMessages);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [viewId, setViewId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return messages;
    const q = search.toLowerCase();
    return messages.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q)
    );
  }, [messages, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = useMemo(
    () => filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE),
    [filtered, page]
  );

  const viewMessage = viewId ? messages.find((m) => m.id === viewId) : null;

  async function handleMarkRead(id: string) {
    try {
      const updated = await markMessageRead(id);
      setMessages((prev) => prev.map((m) => (m.id === id ? updated : m)));
    } catch {
      // ignore
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteMessage(id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      setDeleteId(null);
      if (viewId === id) setViewId(null);
    } catch {
      setDeleteId(null);
    }
  }

  if (messages.length === 0) {
    return (
      <EmptyState
        icon="fi-sr-envelope"
        title="No messages yet"
        description="Contact form submissions will appear here."
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
              placeholder="Search by name, email, or message..."
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
                  Name
                </th>
                <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 sm:table-cell sm:px-6">
                  Email
                </th>
                <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 md:table-cell sm:px-6">
                  Message
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
              {paginated.map((m) => (
                <tr key={m.id} className="transition hover:bg-gray-50">
                  <td className="w-10 px-4 py-3 sm:px-6">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-[var(--umang-teal)]" aria-label={`Select ${m.name}`} />
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900 sm:px-6">
                    {m.name}
                  </td>
                  <td className="hidden px-4 py-3 text-sm text-gray-600 sm:table-cell sm:px-6">
                    {m.email}
                  </td>
                  <td className="hidden max-w-[200px] truncate px-4 py-3 text-sm text-gray-500 md:table-cell sm:px-6">
                    {preview(m.description, PREVIEW_LEN)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 sm:px-6">
                    {new Date(m.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 sm:px-6">
                    <span
                      className={`inline-flex rounded-lg px-2 py-1 text-xs font-medium ${
                        m.read ? "bg-gray-100 text-gray-600" : "bg-[var(--umang-teal)]/10 text-[var(--umang-navy)]"
                      }`}
                    >
                      {m.read ? "Read" : "New"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right sm:px-6">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setViewId(m.id)}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-[var(--umang-teal)]"
                        title="View"
                      >
                        <i className="fi fi-sr-eye h-4 w-4" aria-hidden />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteId(m.id)}
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
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-200 px-4 py-3 sm:px-6">
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

      {/* View message modal */}
      {viewMessage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="view-message-title"
          onClick={() => setViewId(null)}
        >
          <div
            className="w-full max-w-lg rounded-xl border border-gray-200 bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h2 id="view-message-title" className="text-lg font-bold text-[var(--umang-navy)]">
                Message from {viewMessage.name}
              </h2>
              <button
                type="button"
                onClick={() => setViewId(null)}
                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                aria-label="Close"
              >
                <i className="fi fi-sr-cross text-lg" aria-hidden />
              </button>
            </div>
            <div className="px-6 py-4 space-y-3">
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-700">Email:</span>{" "}
                <a href={`mailto:${viewMessage.email}`} className="text-[var(--umang-teal)] hover:underline">
                  {viewMessage.email}
                </a>
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-700">Date:</span>{" "}
                {new Date(viewMessage.createdAt).toLocaleString()}
              </p>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p className="whitespace-pre-wrap text-sm text-gray-800">{viewMessage.description}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 border-t border-gray-200 px-6 py-4">
              {!viewMessage.read && (
                <button
                  type="button"
                  onClick={() => handleMarkRead(viewMessage.id)}
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--umang-teal)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-95"
                >
                  <i className="fi fi-sr-check text-base" aria-hidden />
                  Mark read
                </button>
              )}
              <button
                type="button"
                onClick={() => { setDeleteId(viewMessage.id); setViewId(null); }}
                className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50"
              >
                <i className="fi fi-sr-trash text-base" aria-hidden />
                Delete
              </button>
              <button
                type="button"
                onClick={() => setViewId(null)}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={deleteId !== null}
        title="Delete message"
        message="Are you sure you want to delete this message? This cannot be undone."
        confirmLabel="Delete"
        danger
        onConfirm={() => deleteId && handleDelete(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </>
  );
}
