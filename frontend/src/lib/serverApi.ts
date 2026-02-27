/**
 * Server-side API helpers using native fetch.
 * Used only in Next.js Server Components to avoid the axios/follow-redirects
 * `url.parse()` deprecation warning (DEP0169) on Node.js 22+.
 */

import type { Blog, Doctor } from '@/types';
import type { Message } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

async function apiFetch<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${API_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }
  const res = await fetch(url.toString(), { cache: 'no-store' });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json() as Promise<T>;
}

export async function fetchBlogs(publishedOnly = false): Promise<Blog[]> {
  return apiFetch<Blog[]>('/blogs', { published: String(publishedOnly) });
}

export async function fetchBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    return await apiFetch<Blog>(`/blogs/slug/${encodeURIComponent(slug)}`);
  } catch {
    return null;
  }
}

export async function fetchMessages(): Promise<Message[]> {
  return apiFetch<Message[]>('/messages');
}

export async function fetchDoctors(activeOnly = true): Promise<Doctor[]> {
  try {
    return await apiFetch<Doctor[]>('/doctors', activeOnly ? { active: 'true' } : {});
  } catch {
    return [];
  }
}

export async function fetchDoctorBySlug(slug: string): Promise<Doctor | null> {
  try {
    return await apiFetch<Doctor>(`/doctors/slug/${encodeURIComponent(slug)}`);
  } catch {
    return null;
  }
}
