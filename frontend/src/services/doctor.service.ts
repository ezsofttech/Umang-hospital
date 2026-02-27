import axiosInstance from '@/lib/axiosInstance';
import type { Doctor, CreateDoctorInput } from '@/types';

export const doctorService = {
  getAll: async (activeOnly = false): Promise<Doctor[]> => {
    const res = await axiosInstance.get('/doctors', { params: activeOnly ? { active: 'true' } : {} });
    return res.data;
  },

  getById: async (id: string): Promise<Doctor> => {
    const res = await axiosInstance.get(`/doctors/${id}`);
    return res.data;
  },

  getBySlug: async (slug: string): Promise<Doctor> => {
    const res = await axiosInstance.get(`/doctors/slug/${slug}`);
    return res.data;
  },

  create: async (data: CreateDoctorInput): Promise<Doctor> => {
    const res = await axiosInstance.post('/doctors', data);
    return res.data;
  },

  update: async (id: string, data: Partial<CreateDoctorInput>): Promise<Doctor> => {
    const res = await axiosInstance.patch(`/doctors/${id}`, data);
    return res.data;
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/doctors/${id}`);
  },
};
