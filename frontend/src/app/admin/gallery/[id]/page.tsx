"use client";

import { Suspense } from "react";
import { notFound, useParams } from "next/navigation";
import { useGalleryItem } from "@/hooks/useGallery";
import AdminGalleryForm from "@/components/admin/AdminGalleryForm";

function GalleryEditContent() {
  const params = useParams();
  const id = params.id as string;
  const { data: galleryItem, isLoading, error } = useGalleryItem(id);

  if (isLoading) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 text-center text-gray-600">
        Loading...
      </div>
    );
  }

  if (error || !galleryItem) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[var(--umang-navy)]">Edit Gallery Item</h1>
      <AdminGalleryForm galleryItem={galleryItem} />
    </div>
  );
}

export default function EditGalleryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GalleryEditContent />
    </Suspense>
  );
}
