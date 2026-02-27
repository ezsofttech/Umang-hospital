import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { subcategoryService } from '@/services/subcategory.service';
import type { Subcategory } from '@/types';

const SUBCATEGORY_QUERY_KEY = ['subcategories'];

export const useSubcategories = () => {
  return useQuery({
    queryKey: SUBCATEGORY_QUERY_KEY,
    queryFn: () => subcategoryService.getAll(),
  });
};

export const useSubcategory = (id: string) => {
  return useQuery({
    queryKey: [...SUBCATEGORY_QUERY_KEY, id],
    queryFn: () => subcategoryService.getById(id),
    enabled: !!id,
  });
};

export const useSubcategoriesByCategory = (categoryId: string) => {
  return useQuery({
    queryKey: [...SUBCATEGORY_QUERY_KEY, 'category', categoryId],
    queryFn: () => subcategoryService.getByCategory(categoryId),
    enabled: !!categoryId,
  });
};

export const useCreateSubcategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      title: string;
      description?: string;
      explanation?: string;
      image?: string;
      categoryId: string;
    }) => subcategoryService.create(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: SUBCATEGORY_QUERY_KEY });
      queryClient.invalidateQueries({
        queryKey: [...SUBCATEGORY_QUERY_KEY, 'category', data.categoryId],
      });
    },
  });
};

export const useUpdateSubcategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<{
        title: string;
        description: string;
        explanation: string;
        image: string;
        categoryId: string;
        active: boolean;
      }>;
    }) => subcategoryService.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: SUBCATEGORY_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [...SUBCATEGORY_QUERY_KEY, data._id] });
      queryClient.invalidateQueries({
        queryKey: [...SUBCATEGORY_QUERY_KEY, 'category', data.categoryId],
      });
    },
  });
};

export const useDeleteSubcategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => subcategoryService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUBCATEGORY_QUERY_KEY });
    },
  });
};
