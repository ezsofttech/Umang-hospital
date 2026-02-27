"use client";

import { Suspense } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { useBlog } from "@/hooks/useBlog";
import AdminBlogForm from "@/components/admin/AdminBlogForm";

function BlogContent() {
  const params = useParams();
  const id = params.id as string;
  const { data: blog, isLoading, error } = useBlog(id);

  if (isLoading) {
    return <div className="rounded-xl border border-gray-200 bg-white p-6 text-center text-gray-600">Loading blog...</div>;
  }

  if (error || !blog) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/blogs" className="text-sm text-gray-600 hover:underline">
          ← Blogs
        </Link>
        <h1 className="text-2xl font-bold text-[var(--umang-navy)]">Edit: {blog.title}</h1>
      </div>
      <AdminBlogForm blog={blog} />
    </div>
  );
}

export default function EditBlogPage() {
  return (
    <Suspense fallback={<div className="text-gray-600">Loading...</div>}>
      <BlogContent />
    </Suspense>
  );
}
