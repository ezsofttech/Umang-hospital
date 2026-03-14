import axiosInstance from '@/lib/axiosInstance';
import type { Gallery } from '@/types';

export const galleryService = {
  async getAll(publishedOnly = false): Promise<Gallery[]> {
    const res = await axiosInstance.get('/gallery', {
      params: { published: publishedOnly },
    });
    return res.data;
  },

  async getById(id: string): Promise<Gallery> {
    const res = await axiosInstance.get(`/gallery/${id}`);
    return res.data;
  },

  async create(data: {
    title: string;
    image?: string;
    caption?: string;
    order?: number;
    published?: boolean;
  }): Promise<Gallery> {
    const res = await axiosInstance.post('/gallery', data);
    return res.data;
  },

  async update(
    id: string,
    data: Partial<{
      title: string;
      image: string;
      caption: string;
      order: number;
      published: boolean;
    }>
  ): Promise<Gallery> {
    const res = await axiosInstance.patch(`/gallery/${id}`, data);
    return res.data;
  },

  async delete(id: string): Promise<void> {
    await axiosInstance.delete(`/gallery/${id}`);
  },
};
