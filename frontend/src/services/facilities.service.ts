import axiosInstance from '@/lib/axiosInstance';
import type { Facilities } from '@/types';

export const facilitiesService = {
  async getAll(publishedOnly = false): Promise<Facilities[]> {
    const res = await axiosInstance.get('/facilities', {
      params: { published: publishedOnly },
    });
    return res.data;
  },

  async getById(id: string): Promise<Facilities> {
    const res = await axiosInstance.get(`/facilities/${id}`);
    return res.data;
  },

  async getBySlug(slug: string): Promise<Facilities | null> {
    try {
      const res = await axiosInstance.get(`/facilities/slug/${encodeURIComponent(slug)}`);
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
  }): Promise<Facilities> {
    const res = await axiosInstance.post('/facilities', data);
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
  ): Promise<Facilities> {
    const res = await axiosInstance.patch(`/facilities/${id}`, data);
    return res.data;
  },

  async delete(id: string): Promise<void> {
    await axiosInstance.delete(`/facilities/${id}`);
  },
};
