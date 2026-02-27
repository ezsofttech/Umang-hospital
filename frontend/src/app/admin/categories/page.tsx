'use client';

import React from 'react';
import Link from 'next/link';
import { useCategories, useDeleteCategory } from '@/hooks/useCategories';

export default function CategoriesPage() {
  const { data: categories = [], isLoading, error } = useCategories();
  const deleteCategory = useDeleteCategory();
  const [deleting, setDeleting] = React.useState<string | null>(null);
  const [deleteError, setDeleteError] = React.useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    
    try {
      setDeleting(id);
      setDeleteError(null);
      await deleteCategory.mutateAsync(id);
    } catch (err) {
      setDeleteError("Failed to delete category");
      console.error(err);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--umang-navy)] sm:text-3xl">
              Categories
            </h1>
            <p className="mt-1 text-sm text-gray-600">Manage department categories</p>
          </div>
          <Link
            href="/admin/categories/new"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--umang-navy)] px-4 py-2 font-medium text-white transition hover:bg-[var(--umang-navy)]/90"
          >
            <i className="fi fi-sr-plus" />
            <span className="hidden sm:inline">New Category</span>
          </Link>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            Failed to load categories
          </div>
        )}

        {deleteError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            {deleteError}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="text-gray-600">Loading categories...</div>
          </div>
        ) : categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white py-12 text-center shadow-sm">
            <div className="rounded-full bg-gray-100 p-4 text-gray-400">
              <i className="fi fi-sr-folder text-4xl" aria-hidden />
            </div>
            <h3 className="mt-4 text-base font-semibold text-[var(--umang-navy)]">No categories yet</h3>
            <p className="mt-2 max-w-sm text-sm text-gray-500">Create your first category to get started</p>
            <Link
              href="/admin/categories/new"
              className="mt-4 rounded-lg bg-[var(--umang-navy)] px-4 py-2 text-white text-sm font-medium transition hover:bg-[var(--umang-navy)]/90"
            >
              Create Category
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <div
                key={category._id}
                className="group rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden hover:shadow-md hover:border-gray-300 transition"
              >
                {/* Image */}
                <div
                  className="h-40 bg-gray-200 bg-cover bg-center"
                  style={{ backgroundImage: `url(${category.image})` }}
                />

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <h3 className="text-base font-bold text-[var(--umang-navy)] group-hover:text-[var(--umang-green)] transition">
                    {category.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {category.description}
                  </p>

                  {/* Status Badge */}
                  <div className="mt-4 flex items-center justify-between">
                    <span
                      className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full ${
                        category.active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {category.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex gap-2">
                    <Link
                      href={`/admin/categories/${category._id}`}
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100 transition"
                    >
                      <i className="fi fi-sr-edit" />
                      <span>Edit</span>
                    </Link>
                    <button
                      onClick={() => handleDelete(category._id)}
                      disabled={deleting === category._id}
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition disabled:opacity-50"
                    >
                      <i className="fi fi-sr-trash" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
