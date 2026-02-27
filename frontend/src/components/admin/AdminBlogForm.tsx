"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Blog } from "@/types";
import { useCreateBlog, useUpdateBlog } from "@/hooks/useBlog";
import CloudinaryUpload from "./CloudinaryUpload";
import RichTextEditor from "./RichTextEditor";

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
  const [image, setImage] = useState(blog?.image ?? "");
  const [error, setError] = useState("");
  const submitAsPublishRef = useRef(true);

  const isEdit = !!blog?.id;
  const createMutation = useCreateBlog();
  const updateMutation = useUpdateBlog();
  const isSaving = createMutation.isPending || updateMutation.isPending;

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setTitle(v);
    if (!isEdit) setSlug(slugify(v));
  }

  async function handleSubmit(e: React.FormEvent, asPublished: boolean) {
    e.preventDefault();
    submitAsPublishRef.current = asPublished;
    setError("");
    const bodyText = body.replace(/<[^>]*>/g, "").trim();
    if (!title.trim()) { setError("Title is required"); return; }
    if (!bodyText) { setError("Body content is required"); return; }
    try {
      if (isEdit && blog) {
        await updateMutation.mutateAsync({
          id: blog.id,
          data: { title, slug, excerpt: excerpt || undefined, body, published: asPublished, image: image || undefined },
        });
        router.refresh();
      } else {
        const created = await createMutation.mutateAsync({
          title, slug, excerpt: excerpt || undefined, body,
          published: asPublished, image: image || undefined,
        });
        router.push(`/admin/blogs/${created.id}`);
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    }
  }

  const inputCls = "mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-800 outline-none focus:border-[var(--umang-teal)] focus:ring-1 focus:ring-[var(--umang-teal)]";

  return (
    <form onSubmit={(e) => handleSubmit(e, submitAsPublishRef.current)} className="flex flex-col gap-0">
      {/* ── Sticky top action bar ── */}
      <div className="sticky top-0 z-10 flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-sm mb-6">
        <div>
          <h2 className="text-base font-semibold text-[var(--umang-navy)]">
            {isEdit ? "Edit Blog Post" : "New Blog Post"}
          </h2>
          {error && <p className="text-xs text-red-600 mt-0.5">{error}</p>}
        </div>
        <div className="flex items-center gap-2">
          {isEdit && (
            <button type="button" onClick={() => router.back()}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
          )}
          <button type="submit" disabled={isSaving}
            onClick={() => { submitAsPublishRef.current = false; }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60">
            <i className="fi fi-sr-disk text-sm" aria-hidden />
            {isSaving ? "Saving…" : "Save Draft"}
          </button>
          <button type="submit" disabled={isSaving}
            onClick={() => { submitAsPublishRef.current = true; }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--umang-teal)] px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 disabled:opacity-60">
            <i className="fi fi-sr-check text-sm" aria-hidden />
            {isSaving ? "Saving…" : "Publish"}
          </button>
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">

        {/* Left — main content */}
        <div className="flex flex-col gap-5">
          {/* Title */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Title</label>
            <input
              type="text" value={title} onChange={handleTitleChange} required
              placeholder="Enter blog title…"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-lg font-semibold text-gray-800 outline-none placeholder:font-normal placeholder:text-gray-400 focus:border-[var(--umang-teal)] focus:ring-1 focus:ring-[var(--umang-teal)]"
            />
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs text-gray-400">Slug:</span>
              <input
                type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required
                className="flex-1 rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-xs text-gray-600 outline-none focus:border-[var(--umang-teal)] focus:ring-1 focus:ring-[var(--umang-teal)]"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Excerpt <span className="font-normal normal-case text-gray-400">(optional)</span></label>
            <textarea
              value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3}
              placeholder="Short summary shown in blog listings…"
              className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2.5 text-gray-800 outline-none focus:border-[var(--umang-teal)] focus:ring-1 focus:ring-[var(--umang-teal)]"
            />
          </div>

          {/* Body */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Content</label>
            <RichTextEditor
              value={body} onChange={setBody}
              placeholder="Write your blog content here… Use the toolbar for bold, italic, bullet points, headings and more."
            />
          </div>
        </div>

        {/* Right — sidebar */}
        <div className="flex flex-col gap-5">
          {/* Status */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Status</p>
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${published ? 'bg-green-500' : 'bg-amber-400'}`} />
              <span className="text-sm text-gray-700">{published ? 'Published' : 'Draft'}</span>
            </div>
            <p className="mt-2 text-xs text-gray-400">
              {isEdit ? 'Click Publish to make this post live.' : 'Use Save Draft to keep it hidden or Publish to go live.'}
            </p>
          </div>

          {/* Featured Image */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Featured Image</p>
            <CloudinaryUpload
              value={image} onChange={setImage}
              folder="blogs" label=""
            />
          </div>
        </div>
      </div>
    </form>
  );
}
