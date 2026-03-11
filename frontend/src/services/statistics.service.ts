import axiosInstance from '@/lib/axiosInstance';

export type Statistic = {
  _id: string;
  label: string;
  value: string;
  createdAt?: string;
  updatedAt?: string;
};

export const statisticsService = {
  getAll: async (): Promise<Statistic[]> => {
    const res = await axiosInstance.get('/statistics');
    return res.data;
  },

  getById: async (id: string): Promise<Statistic> => {
    const res = await axiosInstance.get(`/statistics/${id}`);
    return res.data;
  },

  create: async (data: {
    label: string;
    value: string;
  }): Promise<Statistic> => {
    const res = await axiosInstance.post('/statistics', data);
    return res.data;
  },

  update: async (
    id: string,
    data: Partial<{
      label: string;
      value: string;
    }>
  ): Promise<Statistic> => {
    const res = await axiosInstance.put(`/statistics/${id}`, data);
    return res.data;
  },

  delete: async (id: string): Promise<Statistic> => {
    const res = await axiosInstance.delete(`/statistics/${id}`);
    return res.data;
  },
};
