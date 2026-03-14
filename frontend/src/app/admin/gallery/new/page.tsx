import AdminGalleryForm from "@/components/admin/AdminGalleryForm";

export default function NewGalleryPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[var(--umang-navy)]">Add gallery item</h1>
      <AdminGalleryForm />
    </div>
  );
}
