import axiosInstance from '@/lib/axiosInstance';
import type { Category } from '@/types';

export const categoryService = {
  getAll: async (): Promise<Category[]> => {
    const res = await axiosInstance.get('/categories');
    return res.data;
  },

  getById: async (id: string): Promise<Category> => {
    const res = await axiosInstance.get(`/categories/${id}`);
    return res.data;
  },

  create: async (data: {
    title: string;
    slug: string;
    description?: string;
    image?: string;
  }): Promise<Category> => {
    const res = await axiosInstance.post('/categories', data);
    return res.data;
  },

  update: async (
    id: string,
    data: Partial<{ title: string; slug: string; description: string; image: string; active: boolean }>
  ): Promise<Category> => {
    const res = await axiosInstance.put(`/categories/${id}`, data);
    return res.data;
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/categories/${id}`);
  },
};
