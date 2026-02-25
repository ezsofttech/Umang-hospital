"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Blog } from "@/lib/api";
import { createBlog, updateBlog } from "@/lib/api";

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

type Props = { blog?: Blog | null };

export default function AdminBlogForm({ blog }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(blog?.title ?? "");
  const [slug, setSlug] = useState(blog?.slug ?? "");
  const [excerpt, setExcerpt] = useState(blog?.excerpt ?? "");
  const [body, setBody] = useState(blog?.body ?? "");
  const [published, setPublished] = useState(blog?.published ?? false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const submitAsPublishRef = useRef(true);

  const isEdit = !!blog?.id;

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setTitle(v);
    if (!isEdit) setSlug(slugify(v));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const publishedValue = submitAsPublishRef.current;
    setError("");
    setSaving(true);
    try {
      if (isEdit && blog) {
        await updateBlog(blog.id, { title, slug, excerpt: excerpt || undefined, body, published: publishedValue });
        router.refresh();
      } else {
        const created = await createBlog({ title, slug, excerpt: excerpt || undefined, body, published: publishedValue });
        router.push(`/admin/blogs/${created.id}`);
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          required
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 outline-none focus:border-[var(--umang-teal)] focus:ring-1 focus:ring-[var(--umang-teal)]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Slug</label>
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 outline-none focus:border-[var(--umang-teal)] focus:ring-1 focus:ring-[var(--umang-teal)]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Excerpt (optional)</label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={3}
          className="mt-1 w-full resize-y rounded-lg border border-gray-300 px-3 py-2 text-gray-800 outline-none focus:border-[var(--umang-teal)] focus:ring-1 focus:ring-[var(--umang-teal)]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Body</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          rows={12}
          className="mt-1 w-full resize-y rounded-lg border border-gray-300 px-3 py-2 text-gray-800 outline-none focus:border-[var(--umang-teal)] focus:ring-1 focus:ring-[var(--umang-teal)]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Featured image (optional)</label>
        <label className="mt-1 flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-6 transition hover:border-[var(--umang-teal)]/50 hover:bg-gray-100/80">
          <i className="fi fi-sr-upload text-2xl text-gray-400" aria-hidden />
          <div className="flex-1">
            <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
            <input type="file" accept="image/*" className="sr-only" />
          </div>
        </label>
      </div>
      <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-4">
        <button
          type="submit"
          disabled={saving}
          onClick={() => { submitAsPublishRef.current = true; }}
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--umang-teal)] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-95 disabled:opacity-70"
        >
          <i className="fi fi-sr-check text-lg" aria-hidden />
          {saving ? "Saving…" : "Publish"}
        </button>
        <button
          type="submit"
          disabled={saving}
          onClick={() => { submitAsPublishRef.current = false; }}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-70"
        >
          <i className="fi fi-sr-disk text-lg" aria-hidden />
          {saving ? "Saving…" : "Save Draft"}
        </button>
        {isEdit && (
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
