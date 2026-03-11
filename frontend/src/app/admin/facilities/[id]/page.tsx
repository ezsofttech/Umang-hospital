"use client";

import { Suspense } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { useFacility } from "@/hooks/useFacilities";
import AdminFacilitiesForm from "@/components/admin/AdminFacilitiesForm";

function FacilityContent() {
  const params = useParams();
  const id = params.id as string;
  const { data: facility, isLoading, error } = useFacility(id);

  if (isLoading) {
    return <div className="rounded-xl border border-gray-200 bg-white p-6 text-center text-gray-600">Loading facility...</div>;
  }

  if (error || !facility) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-[var(--umang-navy)]">Edit Facility</h1>
      </div>
      <AdminFacilitiesForm facility={facility} />
    </div>
  );
}

export default function EditFacilityPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FacilityContent />
    </Suspense>
  );
}
