'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useCategory, useCreateCategory, useUpdateCategory } from '@/hooks/useCategories';
import CloudinaryUpload from '@/components/admin/CloudinaryUpload';

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function CategoryFormPage() {
  const router = useRouter();
  const params = useParams();
  const categoryId = params.id as string;
  const isNew = categoryId === 'new';

  const { data: category, isLoading } = useCategory(isNew ? '' : categoryId);
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();

  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: '', slug: '', description: '', image: '' });

  useEffect(() => {
    if (isNew || !category) return;
    setFormData({ title: category.title, slug: category.slug || '', description: category.description, image: category.image });
  }, [category, isNew]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) { setError('Category title is required'); return; }
    const finalSlug = formData.slug || slugify(formData.title);
    try {
      setError(null);
      if (isNew) {
        await createCategory.mutateAsync({ title: formData.title, slug: finalSlug, description: formData.description, image: formData.image });
      } else {
        await updateCategory.mutateAsync({ id: categoryId, data: { title: formData.title, slug: finalSlug, description: formData.description, image: formData.image } });
      }
      router.push('/admin/categories');
    } catch { setError('Failed to save category'); }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ 
      ...prev, 
      title: value,
      ...(isNew ? { slug: slugify(value) } : {})
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isLoading && !isNew) {
    return <div className="flex justify-center py-12 text-gray-500">Loadingâ€¦</div>;
  }

  const isSaving = createCategory.isPending || updateCategory.isPending;
  const inputCls = 'mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-800 outline-none focus:border-[var(--umang-teal)] focus:ring-1 focus:ring-[var(--umang-teal)]';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-0">
      {/* â”€â”€ Sticky action bar â”€â”€ */}
      <div className="sticky top-0 z-10 flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-sm mb-6">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-0.5">
            <Link href="/admin/categories" className="hover:text-[var(--umang-teal)] transition">Categories</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">{isNew ? 'New' : 'Edit'}</span>
          </div>
          <h1 className="text-base font-semibold text-[var(--umang-navy)]">
            {isNew ? 'New Category' : 'Edit Category'}
          </h1>
          {error && <p className="text-xs text-red-600 mt-0.5">{error}</p>}
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => router.back()}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
          <button type="submit" disabled={isSaving}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--umang-teal)] px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 disabled:opacity-60">
            <i className="fi fi-sr-check text-sm" aria-hidden />
            {isSaving ? 'Savingâ€¦' : isNew ? 'Create Category' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* â”€â”€ Two-column layout â”€â”€ */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">

        {/* Left â€” main */}
        <div className="flex flex-col gap-5">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">Details</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Category Title <span className="text-red-500">*</span></label>
                <input type="text" name="title" value={formData.title} onChange={handleTitleChange}
                  placeholder="e.g., IVF &amp; Fertility Treatment" required className={inputCls} />
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs text-gray-400">Slug:</span>
                  <input
                    type="text" name="slug" value={formData.slug} onChange={handleChange} required
                    className="flex-1 rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-xs text-gray-600 outline-none focus:border-[var(--umang-teal)] focus:ring-1 focus:ring-[var(--umang-teal)]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange}
                  placeholder="Brief description shown on the departments pageâ€¦" rows={5}
                  className={`${inputCls} resize-y`} />
              </div>
            </div>
          </div>
        </div>

        {/* Right â€” sidebar */}
        <div className="flex flex-col gap-5">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Category Image</p>
            <CloudinaryUpload
              value={formData.image}
              onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
              folder="categories" label=""
            />
          </div>
        </div>
      </div>
    </form>
  );
}
