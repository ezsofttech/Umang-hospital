'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useDoctor, useCreateDoctor, useUpdateDoctor } from '@/hooks/useDoctors';
import CloudinaryUpload from '@/components/admin/CloudinaryUpload';

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const emptyForm = {
  name: '', slug: '', tag: '', role: '', qualification: '',
  about: '', specializations: '', image: '', experience: '',
  department: '', departmentDescription: '', departmentHref: '',
  expertiseRaw: '', active: true,
};

export default function DoctorFormPage() {
  const router = useRouter();
  const params = useParams();
  const doctorId = params.id as string;
  const isNew = doctorId === 'new';

  const { data: doctor, isLoading } = useDoctor(isNew ? '' : doctorId);
  const createDoctor = useCreateDoctor();
  const updateDoctor = useUpdateDoctor();

  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (isNew || !doctor) return;
    setForm({
      name: doctor.name ?? '', slug: doctor.slug ?? '', tag: doctor.tag ?? '',
      role: doctor.role ?? '', qualification: doctor.qualification ?? '',
      about: doctor.about ?? '', specializations: doctor.specializations ?? '',
      image: doctor.image ?? '', experience: doctor.experience ?? '',
      department: doctor.department ?? '', departmentDescription: doctor.departmentDescription ?? '',
      departmentHref: doctor.departmentHref ?? '',
      expertiseRaw: (doctor.expertise ?? []).join(', '),
      active: doctor.active !== false,
    });
  }, [doctor, isNew]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setForm(prev => ({ ...prev, name: v, ...(isNew ? { slug: slugify(v) } : {}) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.role.trim()) { setError('Name and Role are required'); return; }
    try {
      setError(null);
      const expertise = form.expertiseRaw.split(',').map(s => s.trim()).filter(Boolean);
      const payload = {
        name: form.name, slug: form.slug || slugify(form.name), tag: form.tag || undefined,
        role: form.role, qualification: form.qualification || undefined,
        about: form.about || undefined, specializations: form.specializations || undefined,
        image: form.image || undefined, experience: form.experience || undefined,
        department: form.department || undefined, departmentDescription: form.departmentDescription || undefined,
        departmentHref: form.departmentHref || undefined,
        expertise: expertise.length ? expertise : undefined, active: form.active,
      };
      if (isNew) {
        await createDoctor.mutateAsync(payload);
      } else {
        await updateDoctor.mutateAsync({ id: doctorId, data: payload });
      }
      router.push('/admin/doctors');
    } catch (err: any) {
      setError(err?.message ?? 'Failed to save doctor');
    }
  };

  if (isLoading && !isNew) {
    return <div className="flex justify-center py-12 text-gray-500">Loading...</div>;
  }

  const isSaving = createDoctor.isPending || updateDoctor.isPending;
  const inputCls = 'mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-800 outline-none focus:border-[var(--umang-teal)] focus:ring-1 focus:ring-[var(--umang-teal)]';
  const sectionCard = 'rounded-xl border border-gray-200 bg-white p-5 shadow-sm';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-0">
      {/* ── Sticky action bar ── */}
      <div className="sticky top-0 z-10 flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-sm mb-6">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-0.5">
            <Link href="/admin/doctors" className="hover:text-[var(--umang-teal)] transition">Doctors</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">{isNew ? 'New' : 'Edit'}</span>
          </div>
          <h1 className="text-base font-semibold text-[var(--umang-navy)]">
            {isNew ? 'New Doctor Profile' : 'Edit Doctor Profile'}
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
            {isSaving ? 'Saving...' : isNew ? 'Create Doctor' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">

        {/* Left — main content */}
        <div className="flex flex-col gap-5">

          {/* Basic Info */}
          <div className={sectionCard}>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">Basic Information</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
                <input name="name" value={form.name} onChange={handleNameChange}
                  placeholder="Dr. John Smith" required className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Slug</label>
                <input name="slug" value={form.slug} onChange={handleChange}
                  placeholder="dr-john-smith" className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tag <span className="text-gray-400 font-normal">(short label)</span></label>
                <input name="tag" value={form.tag} onChange={handleChange}
                  placeholder="LEAD IVF SPECIALIST" className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role / Title <span className="text-red-500">*</span></label>
                <input name="role" value={form.role} onChange={handleChange}
                  placeholder="Senior Consultant & IVF Specialist" required className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Qualification</label>
                <input name="qualification" value={form.qualification} onChange={handleChange}
                  placeholder="MBBS, MD, DM..." className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Experience</label>
                <input name="experience" value={form.experience} onChange={handleChange}
                  placeholder="15+ years" className={inputCls} />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className={sectionCard}>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">Biography</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">About</label>
                <textarea name="about" value={form.about} onChange={handleChange} rows={4}
                  placeholder="Brief bio about the doctor..." className={`${inputCls} resize-y`} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Specializations</label>
                <textarea name="specializations" value={form.specializations} onChange={handleChange} rows={3}
                  placeholder="Specializes in IVF, ICSI..." className={`${inputCls} resize-y`} />
              </div>
            </div>
          </div>

          {/* Department */}
          <div className={sectionCard}>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">Department</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Department Name</label>
                <input name="department" value={form.department} onChange={handleChange}
                  placeholder="Infertility / IVF" className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Department Link</label>
                <input name="departmentHref" value={form.departmentHref} onChange={handleChange}
                  placeholder="/services" className={inputCls} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Department Description</label>
                <textarea name="departmentDescription" value={form.departmentDescription} onChange={handleChange} rows={2}
                  placeholder="Best IVF centre in Bilaspur..." className={`${inputCls} resize-y`} />
              </div>
            </div>
          </div>

          {/* Expertise */}
          <div className={sectionCard}>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Areas of Expertise</p>
            <p className="text-xs text-gray-400 mb-3">Comma-separated list</p>
            <textarea name="expertiseRaw" value={form.expertiseRaw} onChange={handleChange} rows={3}
              placeholder="IVF, ICSI, IUI, Infertility Diagnosis" className={`${inputCls} resize-y`} />
          </div>
        </div>

        {/* Right — sidebar */}
        <div className="flex flex-col gap-5">

          {/* Photo */}
          <div className={sectionCard}>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Doctor Photo</p>
            <CloudinaryUpload
              value={form.image}
              onChange={(url) => setForm(prev => ({ ...prev, image: url }))}
              folder="doctors" label=""
            />
          </div>

          {/* Visibility */}
          <div className={sectionCard}>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Visibility</p>
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input type="checkbox" name="active" id="active" checked={form.active} onChange={handleChange} className="sr-only peer" />
                <div className="h-5 w-9 rounded-full bg-gray-300 peer-checked:bg-[var(--umang-teal)] transition" />
                <div className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition peer-checked:translate-x-4" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                {form.active ? 'Active visible on website' : 'Hidden from website'}
              </span>
            </label>
          </div>
        </div>
      </div>
    </form>
  );
}
