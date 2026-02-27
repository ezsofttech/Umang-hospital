'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDoctors, useDeleteDoctor } from '@/hooks/useDoctors';

export default function DoctorsAdminPage() {
  const { data: doctors = [], isLoading, error } = useDoctors();
  const deleteDoctor = useDeleteDoctor();
  const [deleting, setDeleting] = React.useState<string | null>(null);
  const [deleteError, setDeleteError] = React.useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this doctor profile?')) return;
    try {
      setDeleting(id);
      setDeleteError(null);
      await deleteDoctor.mutateAsync(id);
    } catch {
      setDeleteError('Failed to delete doctor');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--umang-navy)] sm:text-3xl">Doctors</h1>
          <p className="mt-1 text-sm text-gray-600">Manage doctor profiles</p>
        </div>
        <Link
          href="/admin/doctors/new"
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--umang-navy)] px-4 py-2 font-medium text-white transition hover:bg-[var(--umang-navy)]/90"
        >
          <i className="fi fi-sr-plus" />
          <span className="hidden sm:inline">New Doctor</span>
        </Link>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          Failed to load doctors
        </div>
      )}

      {deleteError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {deleteError}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="text-gray-600">Loading doctors...</div>
        </div>
      ) : doctors.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white py-12 text-center shadow-sm">
          <div className="rounded-full bg-gray-100 p-4 text-gray-400">
            <i className="fi fi-sr-user-md text-4xl" aria-hidden />
          </div>
          <h3 className="mt-4 text-base font-semibold text-[var(--umang-navy)]">No doctors yet</h3>
          <p className="mt-2 max-w-sm text-sm text-gray-500">Create your first doctor profile to get started</p>
          <Link
            href="/admin/doctors/new"
            className="mt-4 rounded-lg bg-[var(--umang-navy)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--umang-navy)]/90"
          >
            Create Doctor
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => {
            const id = doctor._id ?? doctor.id;
            return (
              <div
                key={id}
                className="group rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden hover:shadow-md hover:border-gray-300 transition"
              >
                {/* Photo */}
                <div className="relative h-48 w-full bg-gray-100">
                  {doctor.image ? (
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-300">
                      <i className="fi fi-sr-user text-6xl" aria-hidden />
                    </div>
                  )}
                  <span
                    className={`absolute right-2 top-2 rounded-full px-2 py-0.5 text-xs font-semibold ${
                      doctor.active !== false ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {doctor.active !== false ? 'Active' : 'Inactive'}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--umang-teal)]">
                    {doctor.tag ?? doctor.department ?? '—'}
                  </p>
                  <h3 className="mt-1 text-base font-bold text-[var(--umang-navy)]">{doctor.name}</h3>
                  <p className="text-sm text-gray-500">{doctor.role}</p>
                  {doctor.qualification && (
                    <p className="mt-1 text-xs text-gray-400 line-clamp-1">{doctor.qualification}</p>
                  )}

                  {/* Actions */}
                  <div className="mt-4 flex gap-2">
                    <Link
                      href={`/admin/doctors/${id}`}
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100 transition"
                    >
                      <i className="fi fi-sr-edit" />
                      <span>Edit</span>
                    </Link>
                    <button
                      onClick={() => handleDelete(id)}
                      disabled={deleting === id}
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition disabled:opacity-50"
                    >
                      <i className="fi fi-sr-trash" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
