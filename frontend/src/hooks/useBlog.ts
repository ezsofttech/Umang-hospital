import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { blogService } from '@/services/blog.service';
import type { Blog } from '@/types';

const QUERY_KEYS = {
  all: ['blogs'] as const,
  created: () => [...QUERY_KEYS.all, 'created'] as const,
  published: () => [...QUERY_KEYS.all, 'published'] as const,
  byId: (id: string) => [...QUERY_KEYS.all, 'byId', id] as const,
  bySlug: (slug: string) => [...QUERY_KEYS.all, 'bySlug', slug] as const,
};

export function useBlogs(publishedOnly = false) {
  return useQuery({
    queryKey: publishedOnly ? QUERY_KEYS.published() : QUERY_KEYS.all,
    queryFn: () => blogService.getAll(publishedOnly),
  });
}

export function useBlog(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.byId(id),
    queryFn: () => blogService.getById(id),
    enabled: !!id,
  });
}

export function useBlogBySlug(slug: string) {
  return useQuery({
    queryKey: QUERY_KEYS.bySlug(slug),
    queryFn: () => blogService.getBySlug(slug),
    enabled: !!slug,
  });
}

export function useCreateBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Parameters<typeof blogService.create>[0]) => blogService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
    },
  });
}

export function useUpdateBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof blogService.update>[1] }) =>
      blogService.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
      queryClient.setQueryData(QUERY_KEYS.byId(data.id), data);
    },
  });
}

export function useDeleteBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => blogService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
    },
  });
}
