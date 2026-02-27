import axiosInstance from '@/lib/axiosInstance';
import type { Blog } from '@/types';

export const blogService = {
  async getAll(publishedOnly = false): Promise<Blog[]> {
    const res = await axiosInstance.get('/blogs', {
      params: { published: publishedOnly },
    });
    return res.data;
  },

  async getById(id: string): Promise<Blog> {
    const res = await axiosInstance.get(`/blogs/${id}`);
    return res.data;
  },

  async getBySlug(slug: string): Promise<Blog | null> {
    try {
      const res = await axiosInstance.get(`/blogs/slug/${encodeURIComponent(slug)}`);
      return res.data;
    } catch (error: any) {
      if (error.response?.status === 404) return null;
      throw error;
    }
  },

  async create(data: {
    title: string;
    slug: string;
    excerpt?: string;
    body: string;
    published?: boolean;
    image?: string;
  }): Promise<Blog> {
    const res = await axiosInstance.post('/blogs', data);
    return res.data;
  },

  async update(
    id: string,
    data: Partial<{
      title: string;
      slug: string;
      excerpt: string;
      body: string;
      published: boolean;
      image: string;
    }>
  ): Promise<Blog> {
    const res = await axiosInstance.patch(`/blogs/${id}`, data);
    return res.data;
  },

  async delete(id: string): Promise<void> {
    await axiosInstance.delete(`/blogs/${id}`);
  },
};
