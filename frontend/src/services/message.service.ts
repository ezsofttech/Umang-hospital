import axiosInstance from '@/lib/axiosInstance';
import type { Message } from '@/types';

export const messageService = {
  async getAll(): Promise<Message[]> {
    const res = await axiosInstance.get('/messages');
    return res.data;
  },

  async getById(id: string): Promise<Message> {
    const res = await axiosInstance.get(`/messages/${id}`);
    return res.data;
  },

  async create(data: { name: string; email: string; description: string }): Promise<Message> {
    const res = await axiosInstance.post('/messages', data);
    return res.data;
  },

  async markRead(id: string): Promise<Message> {
    const res = await axiosInstance.patch(`/messages/${id}/read`);
    return res.data;
  },

  async delete(id: string): Promise<void> {
    await axiosInstance.delete(`/messages/${id}`);
  },
};
