import axiosInstance from '@/lib/axiosInstance';

export interface Hero {
  _id?: string;
  title: string;
  description: string;
  backgroundImage?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
  subtitle?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const heroService = {
  getActive: async (): Promise<Hero> => {
    const res = await axiosInstance.get('/hero/active');
    return res.data;
  },

  getAll: async (): Promise<Hero> => {
    const res = await axiosInstance.get('/hero');
    return res.data;
  },

  getById: async (id: string): Promise<Hero> => {
    const res = await axiosInstance.get(`/hero/${id}`);
    return res.data;
  },

  create: async (data: Hero): Promise<Hero> => {
    const res = await axiosInstance.post('/hero', data);
    return res.data;
  },

  update: async (id: string, data: Partial<Hero>): Promise<Hero> => {
    console.log('Service sending update request with:', { id, data });
    const res = await axiosInstance.put(`/hero/${id}`, data);
    console.log('Service received response:', res.data);
    return res.data;
  },
};
