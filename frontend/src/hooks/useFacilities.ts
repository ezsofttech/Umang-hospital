import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { facilitiesService } from '@/services/facilities.service';
import type { Facilities } from '@/types';

const QUERY_KEYS = {
  all: ['facilities'] as const,
  created: () => [...QUERY_KEYS.all, 'created'] as const,
  published: () => [...QUERY_KEYS.all, 'published'] as const,
  byId: (id: string) => [...QUERY_KEYS.all, 'byId', id] as const,
  bySlug: (slug: string) => [...QUERY_KEYS.all, 'bySlug', slug] as const,
};

export function useFacilities(publishedOnly = false) {
  return useQuery({
    queryKey: publishedOnly ? QUERY_KEYS.published() : QUERY_KEYS.all,
    queryFn: () => facilitiesService.getAll(publishedOnly),
  });
}

export function useFacility(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.byId(id),
    queryFn: () => facilitiesService.getById(id),
    enabled: !!id,
  });
}

export function useFacilityBySlug(slug: string) {
  return useQuery({
    queryKey: QUERY_KEYS.bySlug(slug),
    queryFn: () => facilitiesService.getBySlug(slug),
    enabled: !!slug,
  });
}

export function useCreateFacilities() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Parameters<typeof facilitiesService.create>[0]) => facilitiesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
    },
  });
}

export function useUpdateFacilities() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof facilitiesService.update>[1] }) =>
      facilitiesService.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
      queryClient.setQueryData(QUERY_KEYS.byId(data.id), data);
    },
  });
}

export function useDeleteFacilities() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => facilitiesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
    },
  });
}
