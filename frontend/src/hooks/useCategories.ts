import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryService } from '@/services/category.service';
import type { Category } from '@/types';

const CATEGORY_QUERY_KEY = ['categories'];

export const useCategories = () => {
  return useQuery({
    queryKey: CATEGORY_QUERY_KEY,
    queryFn: () => categoryService.getAll(),
  });
};

export const useCategory = (id: string) => {
  return useQuery({
    queryKey: [...CATEGORY_QUERY_KEY, id],
    queryFn: () => categoryService.getById(id),
    enabled: !!id,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      title: string;
      slug: string;
      description?: string;
      image?: string;
    }) => categoryService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORY_QUERY_KEY });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<{ title: string; slug: string; description: string; image: string; active: boolean }>;
    }) => categoryService.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: CATEGORY_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [...CATEGORY_QUERY_KEY, data._id] });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => categoryService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORY_QUERY_KEY });
    },
  });
};
