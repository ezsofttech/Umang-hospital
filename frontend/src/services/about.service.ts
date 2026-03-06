import axiosInstance from '@/lib/axiosInstance';

export interface About {
  _id?: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  mainImage?: string;
  experienceBadgeImage?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const aboutService = {
  getActive: async (): Promise<About | null> => {
    try {
      const res = await axiosInstance.get('/about');
      return res.data;
    } catch {
      return null;
    }
  },

  getAll: async (): Promise<About> => {
    const res = await axiosInstance.get('/about');
    return res.data;
  },

  create: async (data: About): Promise<About> => {
    const res = await axiosInstance.post('/about', data);
    return res.data;
  },

  update: async (id: string, data: Partial<About>): Promise<About> => {
    const res = await axiosInstance.put(`/about/${id}`, data);
    return res.data;
  },
};
