import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { galleryService } from '@/services/gallery.service';

const QUERY_KEYS = {
  all: ['gallery'] as const,
  published: () => [...QUERY_KEYS.all, 'published'] as const,
  byId: (id: string) => [...QUERY_KEYS.all, 'byId', id] as const,
};

export function useGallery(publishedOnly = false) {
  return useQuery({
    queryKey: publishedOnly ? QUERY_KEYS.published() : QUERY_KEYS.all,
    queryFn: () => galleryService.getAll(publishedOnly),
  });
}

export function useGalleryItem(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.byId(id),
    queryFn: () => galleryService.getById(id),
    enabled: !!id,
  });
}

export function useCreateGallery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Parameters<typeof galleryService.create>[0]) => galleryService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
    },
  });
}

export function useUpdateGallery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof galleryService.update>[1] }) =>
      galleryService.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
      queryClient.setQueryData(QUERY_KEYS.byId(data.id), data);
    },
  });
}

export function useDeleteGallery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => galleryService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
    },
  });
}
