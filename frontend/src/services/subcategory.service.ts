import axiosInstance from '@/lib/axiosInstance';
import type { Subcategory } from '@/types';

export const subcategoryService = {
  getAll: async (): Promise<Subcategory[]> => {
    const res = await axiosInstance.get('/subcategories');
    return res.data;
  },

  getById: async (id: string): Promise<Subcategory> => {
    const res = await axiosInstance.get(`/subcategories/${id}`);
    return res.data;
  },

  getBySlug: async (slug: string): Promise<Subcategory> => {
    const res = await axiosInstance.get(`/subcategories/slug/${encodeURIComponent(slug)}`);
    return res.data;
  },

  getByCategory: async (categoryId: string): Promise<Subcategory[]> => {
    const res = await axiosInstance.get(`/subcategories/category/${categoryId}`);
    return res.data;
  },

  create: async (data: {
    title: string;
    slug: string;
    description?: string;
    explanation?: string;
    image?: string;
    categoryId: string;
  }): Promise<Subcategory> => {
    const res = await axiosInstance.post('/subcategories', data);
    return res.data;
  },

  update: async (
    id: string,
    data: Partial<{
      title: string;
      slug: string;
      description: string;
      explanation: string;
      image: string;
      categoryId: string;
      active: boolean;
    }>
  ): Promise<Subcategory> => {
    const res = await axiosInstance.put(`/subcategories/${id}`, data);
    return res.data;
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/subcategories/${id}`);
  },
};
