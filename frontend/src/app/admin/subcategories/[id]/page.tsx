'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useSubcategory, useCreateSubcategory, useUpdateSubcategory } from '@/hooks/useSubcategories';
import { useCategories } from '@/hooks/useCategories';
import CloudinaryUpload from '@/components/admin/CloudinaryUpload';
import RichTextEditor from '@/components/admin/RichTextEditor';

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

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
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '', slug: '', description: '', shortDescription: '', explanation: '', image: '', categoryId: '', stats: [
      { value: '', label: '' },
      { value: '', label: '' },
      { value: '', label: '' },
    ],
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
      slug: subcategory.slug || '',
      description: subcategory.description,
      shortDescription: subcategory.shortDescription || '',
      explanation: subcategory.explanation,
      image: subcategory.image,
      categoryId: subcategory.categoryId,
      stats: subcategory.stats && subcategory.stats.length > 0
        ? subcategory.stats
        : [
            { value: '', label: '' },
            { value: '', label: '' },
            { value: '', label: '' },
          ],
    });
  }, [subcategory, isNew]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) { setError('Subcategory title is required'); return; }
    if (!formData.categoryId) { setError('Please select a category'); return; }
    const finalSlug = formData.slug || slugify(formData.title);
    const filteredStats = formData.stats.filter(stat => stat.value.trim() && stat.label.trim());
    try {
      setError(null);
      setSuccess(null);
      const payload = {
        title: formData.title,
        slug: finalSlug,
        description: formData.description,
        shortDescription: formData.shortDescription,
        explanation: formData.explanation,
        image: formData.image,
        categoryId: formData.categoryId,
        ...(filteredStats.length > 0 && { stats: filteredStats }),
      };
      console.log('Submitting payload with stats:', payload);
      if (isNew) {
        await createSubcategory.mutateAsync(payload);
      } else {
        await updateSubcategory.mutateAsync({ id: subcategoryId, data: payload });
      }
      setSuccess(`Service ${isNew ? 'created' : 'updated'} successfully!`);
      setTimeout(() => router.push('/admin/subcategories'), 1500);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save subcategory';
      console.error('Error saving subcategory:', err);
      setError(message);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ 
      ...prev, 
      title: value,
      ...(isNew ? { slug: slugify(value) } : {})
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStatChange = (index: number, field: 'value' | 'label', text: string) => {
    setFormData(prev => ({
      ...prev,
      stats: prev.stats.map((stat, i) =>
        i === index ? { ...stat, [field]: text } : stat
      ),
    }));
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
            <Link href="/admin/subcategories" className="hover:text-(--umang-teal) transition">Services</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">{isNew ? 'New' : 'Edit'}</span>
          </div>
          <h1 className="text-base font-semibold text-(--umang-navy)">
            {isNew ? 'New Service / Treatment' : 'Edit Service / Treatment'}
          </h1>
          {error && <p className="text-xs text-red-600 mt-0.5">{error}</p>}
          {success && <p className="text-xs text-green-600 mt-0.5">{success}</p>}
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => router.back()}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
          <button type="submit" disabled={isSaving}
            className="inline-flex items-center gap-1.5 rounded-lg bg-(--umang-teal) px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 disabled:opacity-60">
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
                <input type="text" name="title" value={formData.title} onChange={handleTitleChange}
                  placeholder="e.g., IVF Treatment" required className={inputCls} />
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs text-gray-400">Slug:</span>
                  <input
                    type="text" name="slug" value={formData.slug} onChange={handleChange} required
                    className="flex-1 rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-xs text-gray-600 outline-none focus:border-(--umang-teal) focus:ring-1 focus:ring-(--umang-teal)"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Short Description</label>
                <input type="text" name="description" value={formData.description} onChange={handleChange}
                  placeholder="Brief description shown in listings" className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Hero Section Description</label>
                <textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange}
                  placeholder="Description shown in the hero section above (max 2-3 lines)..." rows={3}
                  className={`${inputCls} resize-y`} />
                <p className="mt-1 text-xs text-gray-500">This appears in the hero section. Leave blank to use listing description.</p>
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
          {/* Stats */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">Service Stats</p>
            <div className="space-y-4">
              {formData.stats.map((stat, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Value <span className="text-gray-400">(e.g., 10+, 1000+)</span></label>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                      placeholder="e.g., 10+"
                      className={inputCls}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Label</label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                      placeholder="e.g., Years of Experience"
                      className={inputCls}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-gray-500">Leave empty to use default stats on the service page.</p>
          </div>
        </div>

        {/* Right – sidebar */}
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
