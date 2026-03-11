import AdminFacilitiesForm from "@/components/admin/AdminFacilitiesForm";

export default function NewFacilityPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[var(--umang-navy)]">New facility</h1>
      <AdminFacilitiesForm />
    </div>
  );
}
