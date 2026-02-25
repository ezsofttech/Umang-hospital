import AdminBlogForm from "@/components/admin/AdminBlogForm";

export default function NewBlogPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[var(--umang-navy)]">New blog post</h1>
      <AdminBlogForm />
    </div>
  );
}
