'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useSubcategory, useCreateSubcategory, useUpdateSubcategory } from '@/hooks/useSubcategories';
import { useCategories } from '@/hooks/useCategories';
import CloudinaryUpload from '@/components/admin/CloudinaryUpload';
import RichTextEditor from '@/components/admin/RichTextEditor';

export default function SubcategoryFormPage() {
  const router = useRouter();
  const params = useParams();
  const subcategoryId = params.id as string;
  const isNew = subcategoryId === 'new';

  const { data: subcategory, isLoading } = useSubcategory(isNew ? '' : subcategoryId);
  const { data: categories = [] } = useCategories();
  const createSubcategory = useCreateSubcategory();
  const updateSubcategory = useUpdateSubcategory();

  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '', description: '', explanation: '', image: '', categoryId: '',
  });

  useEffect(() => {
    if (categories.length > 0 && formData.categoryId === '') {
      setFormData(prev => ({ ...prev, categoryId: categories[0]._id }));
    }
  }, [categories]);

  useEffect(() => {
    if (isNew || !subcategory) return;
    setFormData({
      title: subcategory.title,
      description: subcategory.description,
      explanation: subcategory.explanation,
      image: subcategory.image,
      categoryId: subcategory.categoryId,
    });
  }, [subcategory, isNew]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) { setError('Subcategory title is required'); return; }
    if (!formData.categoryId) { setError('Please select a category'); return; }
    try {
      setError(null);
      if (isNew) {
        await createSubcategory.mutateAsync({ title: formData.title, description: formData.description, explanation: formData.explanation, image: formData.image, categoryId: formData.categoryId });
      } else {
        await updateSubcategory.mutateAsync({ id: subcategoryId, data: { title: formData.title, description: formData.description, explanation: formData.explanation, image: formData.image, categoryId: formData.categoryId } });
      }
      router.push('/admin/subcategories');
    } catch { setError('Failed to save subcategory'); }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isLoading && !isNew) {
    return <div className="flex justify-center py-12 text-gray-500">Loadingâ€¦</div>;
  }

  const isSaving = createSubcategory.isPending || updateSubcategory.isPending;
  const inputCls = 'mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-800 outline-none focus:border-[var(--umang-teal)] focus:ring-1 focus:ring-[var(--umang-teal)]';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-0">
      {/* â”€â”€ Sticky action bar â”€â”€ */}
      <div className="sticky top-0 z-10 flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-sm mb-6">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-0.5">
            <Link href="/admin/subcategories" className="hover:text-[var(--umang-teal)] transition">Services</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">{isNew ? 'New' : 'Edit'}</span>
          </div>
          <h1 className="text-base font-semibold text-[var(--umang-navy)]">
            {isNew ? 'New Service / Treatment' : 'Edit Service / Treatment'}
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
            {isSaving ? 'Savingâ€¦' : isNew ? 'Create' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* â”€â”€ Two-column layout â”€â”€ */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">

        {/* Left â€” main content */}
        <div className="flex flex-col gap-5">
          {/* Title + Description */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">Basic Info</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title <span className="text-red-500">*</span></label>
                <input type="text" name="title" value={formData.title} onChange={handleChange}
                  placeholder="e.g., IVF Treatment" required className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Short Description</label>
                <input type="text" name="description" value={formData.description} onChange={handleChange}
                  placeholder="Brief description shown in listings" className={inputCls} />
              </div>
            </div>
          </div>

          {/* Explanation â€” rich text */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Detailed Explanation</p>
            <RichTextEditor
              value={formData.explanation}
              onChange={(html) => setFormData(prev => ({ ...prev, explanation: html }))}
              placeholder="Write a detailed explanationâ€¦ Use the toolbar for bold, italic, bullet points, headings and more."
            />
          </div>
        </div>

        {/* Right â€” sidebar */}
        <div className="flex flex-col gap-5">
          {/* Category */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Department</p>
            <select name="categoryId" value={formData.categoryId} onChange={handleChange} required
              className={inputCls}>
              <option value="">Select a departmentâ€¦</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.title}</option>
              ))}
            </select>
          </div>

          {/* Service Image */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Service Image</p>
            <CloudinaryUpload
              value={formData.image}
              onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
              folder="subcategories" label=""
            />
          </div>
        </div>
      </div>
    </form>
  );
}
