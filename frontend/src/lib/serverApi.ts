/**
 * Server-side API helpers using native fetch.
 * Used only in Next.js Server Components to avoid the axios/follow-redirects
 * `url.parse()` deprecation warning (DEP0169) on Node.js 22+.
 */

import type { Blog, Doctor, Category, Subcategory } from '@/types';
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

// Categories
export async function fetchCategories(): Promise<Category[]> {
  try {
    return await apiFetch<Category[]>('/categories');
  } catch {
    return [];
  }
}

export async function fetchCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    return await apiFetch<Category>(`/categories/${encodeURIComponent(slug)}`);
  } catch {
    return null;
  }
}

// Subcategories
export async function fetchSubcategories(): Promise<Subcategory[]> {
  try {
    return await apiFetch<Subcategory[]>('/subcategories');
  } catch {
    return [];
  }
}

export async function fetchSubcategoryBySlug(slug: string): Promise<Subcategory | null> {
  try {
    return await apiFetch<Subcategory>(`/subcategories/${encodeURIComponent(slug)}`);
  } catch {
    return null;
  }
}

export async function fetchSubcategoriesByCategory(categoryId: string): Promise<Subcategory[]> {
  try {
    return await apiFetch<Subcategory[]>(`/subcategories/category/${encodeURIComponent(categoryId)}`);
  } catch {
    return [];
  }
}
