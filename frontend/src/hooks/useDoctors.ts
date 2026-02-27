import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { doctorService } from '@/services/doctor.service';
import type { CreateDoctorInput } from '@/types';

const DOCTORS_KEY = ['doctors'];

export function useDoctors(activeOnly = false) {
  return useQuery({
    queryKey: [...DOCTORS_KEY, { activeOnly }],
    queryFn: () => doctorService.getAll(activeOnly),
  });
}

export function useDoctor(id: string) {
  return useQuery({
    queryKey: [...DOCTORS_KEY, id],
    queryFn: () => doctorService.getById(id),
    enabled: !!id,
  });
}

export function useCreateDoctor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateDoctorInput) => doctorService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: DOCTORS_KEY }),
  });
}

export function useUpdateDoctor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateDoctorInput> }) =>
      doctorService.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: DOCTORS_KEY }),
  });
}

export function useDeleteDoctor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => doctorService.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: DOCTORS_KEY }),
  });
}
