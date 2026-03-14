"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Gallery } from "@/types";
import { useCreateGallery, useUpdateGallery } from "@/hooks/useGallery";
import CloudinaryUpload from "./CloudinaryUpload";

type Props = { galleryItem?: Gallery | null };

export default function AdminGalleryForm({ galleryItem }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(galleryItem?.title ?? "");
  const [image, setImage] = useState(galleryItem?.image ?? "");
  const [caption, setCaption] = useState(galleryItem?.caption ?? "");
  const [order, setOrder] = useState(galleryItem?.order ?? 0);
  const [published, setPublished] = useState(galleryItem?.published ?? true);
  const [error, setError] = useState("");
  const submitAsPublishRef = { current: true };

  const isEdit = !!galleryItem?.id;
  const createMutation = useCreateGallery();
  const updateMutation = useUpdateGallery();
  const isSaving = createMutation.isPending || updateMutation.isPending;

  async function handleSubmit(e: React.FormEvent, asPublished: boolean) {
    e.preventDefault();
    setError("");
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    try {
      if (isEdit && galleryItem) {
        await updateMutation.mutateAsync({
          id: galleryItem.id,
          data: {
            title,
            image: image || undefined,
            caption: caption || undefined,
            order: Number(order) || 0,
            published: asPublished,
          },
        });
        router.refresh();
      } else {
        const created = await createMutation.mutateAsync({
          title,
          image: image || undefined,
          caption: caption || undefined,
          order: Number(order) || 0,
          published: asPublished,
        });
        router.push(`/admin/gallery/${created.id}`);
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, submitAsPublishRef.current)} className="flex flex-col gap-6">
      <div className="sticky top-0 z-10 flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-sm">
        <div>
          <h2 className="text-base font-semibold text-[var(--umang-navy)]">
            {isEdit ? "Edit Gallery Item" : "New Gallery Item"}
          </h2>
          {error && <p className="mt-0.5 text-xs text-red-600">{error}</p>}
        </div>
        <div className="flex items-center gap-2">
          {isEdit && (
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSaving}
            onClick={() => { submitAsPublishRef.current = false; }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60"
          >
            <i className="fi fi-sr-disk text-sm" aria-hidden />
            {isSaving ? "Saving…" : "Save Draft"}
          </button>
          <button
            type="submit"
            disabled={isSaving}
            onClick={() => { submitAsPublishRef.current = true; }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--umang-teal)] px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 disabled:opacity-60"
          >
            <i className="fi fi-sr-check text-sm" aria-hidden />
            {isSaving ? "Saving…" : "Publish"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-5">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-gray-500">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="e.g. Operation Theatre"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-800 outline-none placeholder:text-gray-400 focus:border-[var(--umang-teal)] focus:ring-1 focus:ring-[var(--umang-teal)]"
            />
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-gray-500">
              Caption <span className="font-normal normal-case text-gray-400">(optional)</span>
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={3}
              placeholder="Short description for this image"
              className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2.5 text-gray-800 outline-none focus:border-[var(--umang-teal)] focus:ring-1 focus:ring-[var(--umang-teal)]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Image</p>
            <CloudinaryUpload value={image} onChange={setImage} folder="gallery" label="" />
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Display order</p>
            <input
              type="number"
              min={0}
              value={order}
              onChange={(e) => setOrder(Number(e.target.value) || 0)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-800 outline-none focus:border-[var(--umang-teal)] focus:ring-1 focus:ring-[var(--umang-teal)]"
            />
            <p className="mt-2 text-xs text-gray-400">Lower numbers appear first.</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Status</p>
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${published ? "bg-green-500" : "bg-amber-400"}`} />
              <span className="text-sm text-gray-700">{published ? "Published" : "Draft"}</span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
