'use client';

import { useEffect, useState } from 'react';
import { heroService } from '@/services/hero.service';
import type { Hero } from '@/services/hero.service';
import CloudinaryUpload from '@/components/admin/CloudinaryUpload';

export default function HeroPage() {
  const [hero, setHero] = useState<Hero | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subtitle: '',
    backgroundImage: '',
    ctaButtonText: '',
    ctaButtonLink: '',
  });

  // Fetch hero data on mount
  useEffect(() => {
    const loadHero = async () => {
      try {
        setIsLoading(true);
        console.log('📥 Fetching hero data...');
        const data = await heroService.getActive();
        console.log('✅ Hero data fetched:', data);
        setHero(data);
        setFormData({
          title: data.title || '',
          description: data.description || '',
          subtitle: data.subtitle || '',
          backgroundImage: data.backgroundImage || '',
          ctaButtonText: data.ctaButtonText || '',
          ctaButtonLink: data.ctaButtonLink || '',
        });
      } catch (err) {
        console.error('❌ Failed to load hero:', err);
        setError('Failed to load hero section');
      } finally {
        setIsLoading(false);
      }
    };
    loadHero();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log(`📝 Field changed: ${name} = "${value}"`);
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      console.log(`📋 Updated formData:`, updated);
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🚀 Form submitted');
    console.log('Form data at submit:', formData);
    
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    
    if (!formData.description.trim()) {
      setError('Description is required');
      return;
    }

    if (!hero?._id) {
      setError('Hero ID not found');
      return;
    }

    try {
      setError(null);
      setSuccess(null);
      setIsSaving(true);
      
      console.log('💾 Saving hero with ID:', hero._id);
      console.log('💾 Sending data:', formData);
      
      const updated = await heroService.update(hero._id, formData);
      console.log('✅ Hero updated successfully:', updated);
      
      setHero(updated);
      setSuccess('Hero section updated successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('❌ Save failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to save hero section');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12 text-gray-500">
        Loading...
      </div>
    );
  }

  const inputCls =
    'mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-800 outline-none focus:border-[var(--umang-teal)] focus:ring-1 focus:ring-[var(--umang-teal)]';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-0">
      {/* Sticky action bar */}
      <div className="sticky top-0 z-10 flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-sm mb-6">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-0.5">
            <span className="text-gray-800 font-medium">Hero Section</span>
          </div>
          <h1 className="text-base font-semibold text-[var(--umang-navy)]">
            Edit Hero Section
          </h1>
          {error && <p className="text-xs text-red-600 mt-0.5">{error}</p>}
          {success && <p className="text-xs text-green-600 mt-0.5">✓ {success}</p>}
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--umang-teal)] px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 disabled:opacity-60"
        >
          <i className="fi fi-sr-check text-sm" aria-hidden />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
        {/* Left – main content */}
        <div className="flex flex-col gap-5">
          {/* Main Details */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
              Main Content
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Hero Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Best IVF Center & Super Specialty Hospital in Bilaspur"
                  required
                  className={inputCls}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Subtitle
                </label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  placeholder="e.g., Best IVF Center & Super Specialty Hospital in Bilaspur"
                  className={inputCls}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Main hero description text..."
                  rows={6}
                  required
                  className={`${inputCls} resize-y`}
                />
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
              Call to Action Button
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Button Text
                </label>
                <input
                  type="text"
                  name="ctaButtonText"
                  value={formData.ctaButtonText}
                  onChange={handleChange}
                  placeholder="e.g., Book an Appointment"
                  className={inputCls}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Button Link
                </label>
                <input
                  type="text"
                  name="ctaButtonLink"
                  value={formData.ctaButtonLink}
                  onChange={handleChange}
                  placeholder="e.g., #appointment"
                  className={inputCls}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right – sidebar */}
        <div className="flex flex-col gap-5">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
              Background Image
            </p>
            <CloudinaryUpload
              value={formData.backgroundImage}
              onChange={(url) =>
                setFormData((prev) => ({ ...prev, backgroundImage: url }))
              }
              folder="hero"
              label=""
            />
            {formData.backgroundImage && (
              <div className="mt-3 text-xs text-gray-500">
                Current: {formData.backgroundImage.split('/').pop()}
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
            <p className="text-xs font-semibold text-blue-900 mb-1">💡 Tip</p>
            <p className="text-xs text-blue-800">
              The hero section appears at the top of your website. Make sure your title and description are compelling!
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
