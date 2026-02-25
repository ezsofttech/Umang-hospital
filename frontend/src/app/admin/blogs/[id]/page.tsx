import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlog } from "@/lib/api";
import AdminBlogForm from "@/components/admin/AdminBlogForm";

type Props = { params: Promise<{ id: string }> };

export default async function EditBlogPage({ params }: Props) {
  const { id } = await params;
  let blog = null;
  try {
    blog = await getBlog(id);
  } catch {
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
