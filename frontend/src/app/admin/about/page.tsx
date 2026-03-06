'use client';

import { useEffect, useState } from 'react';
import { API_URL } from '@/lib/config';
import CloudinaryUpload from '@/components/admin/CloudinaryUpload';

interface AboutData {
  _id?: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  mainImage?: string;
  experienceBadgeImage?: string;
}

export default function AboutPage() {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const isNew = !about?._id;

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    features: [] as string[],
    mainImage: '',
    experienceBadgeImage: '',
  });

  const [newFeature, setNewFeature] = useState('');

  // Fetch about data on mount
  useEffect(() => {
    const loadAbout = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${API_URL}/about`, { credentials: 'include' });
        if (!res.ok) throw new Error('Failed to load about section');
        const data = await res.json();
        if (data) {
          setAbout(data);
          setFormData({
            title: data.title || '',
            subtitle: data.subtitle || '',
            description: data.description || '',
            features: data.features || [],
            mainImage: data.mainImage || '',
            experienceBadgeImage: data.experienceBadgeImage || '',
          });
        }
      } catch (err) {
        console.error('Failed to load about:', err);
        setError('Failed to load about section');
      } finally {
        setIsLoading(false);
      }
    };
    loadAbout();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formData.title.trim() || !formData.subtitle.trim() || !formData.description.trim()) {
      setError('Title, subtitle, and description are required');
      return;
    }

    try {
      setIsSaving(true);
      const method = isNew ? 'POST' : 'PUT';
      const endpoint = isNew ? '/about' : `/about/${about!._id}`;
      const res = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.message || 'Failed to save about section');
      }

      const saved = await res.json();
      setAbout(saved);
      setSuccess(`About section ${isNew ? 'created' : 'updated'} successfully!`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save about section');
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
            <span className="text-gray-800 font-medium">About Us Section</span>
          </div>
          <h1 className="text-base font-semibold text-[var(--umang-navy)]">
            {isNew ? 'Create About Us' : 'Edit About Us'}
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
          {isSaving ? (isNew ? 'Creating...' : 'Saving...') : (isNew ? 'Create' : 'Save Changes')}
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
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Bilaspur's Premier IVF & Super Specialty Hospital"
                  required
                  className={inputCls}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Subtitle <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  placeholder="e.g., Super Specialty Hospital"
                  required
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
                  placeholder="Main about section description..."
                  rows={6}
                  required
                  className={`${inputCls} resize-y`}
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
              Key Features
            </p>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Add a feature"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  className={inputCls}
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="mt-1 rounded-lg border border-[var(--umang-teal)] bg-[var(--umang-teal)]/10 px-3 py-2.5 text-sm font-medium text-[var(--umang-teal)] hover:bg-[var(--umang-teal)]/20"
                >
                  Add
                </button>
              </div>
              <div className="space-y-2">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                    <span className="text-sm text-gray-800">{feature}</span>
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <i className="fi fi-sr-trash text-sm" aria-hidden />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right – sidebar */}
        <div className="flex flex-col gap-5">
          {/* Main Image */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
              Main Image
            </p>
            <CloudinaryUpload
              value={formData.mainImage}
              onChange={(url) =>
                setFormData((prev) => ({ ...prev, mainImage: url }))
              }
              folder="about"
              label=""
            />
            {/* {formData.mainImage && (
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-2">Current: {formData.mainImage.split('/').pop()}</p>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 flex items-center justify-center h-20">
                  <img 
                    src={formData.mainImage} 
                    alt="Main image preview" 
                    className="max-h-16 max-w-full object-contain"
                  />
                </div>
              </div>
            )} */}
          </div>

          {/* Experience Badge */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
              Experience Badge
            </p>
            <CloudinaryUpload
              value={formData.experienceBadgeImage}
              onChange={(url) =>
                setFormData((prev) => ({ ...prev, experienceBadgeImage: url }))
              }
              folder="badges"
              label=""
              isSvgSupported={true}
            />
            {/* {formData.experienceBadgeImage && (
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-2">Current: {formData.experienceBadgeImage.split('/').pop()}</p>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 flex items-center justify-center h-20">
                  <img 
                    src={formData.experienceBadgeImage} 
                    alt="Badge preview" 
                    className="max-h-16 max-w-full object-contain"
                  />
                </div>
              </div>
            )} */}
          </div>

          {/* Info Box */}
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
            <p className="text-xs font-semibold text-blue-900 mb-1">💡 Tip</p>
            <p className="text-xs text-blue-800">
              The About Us section introduces your hospital to visitors. Make it compelling and informative!
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
