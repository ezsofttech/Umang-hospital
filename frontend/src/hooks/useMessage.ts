import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { messageService } from '@/services/message.service';
import type { Message } from '@/types';

const QUERY_KEYS = {
  all: ['messages'] as const,
  byId: (id: string) => [...QUERY_KEYS.all, 'byId', id] as const,
};

export function useMessages() {
  return useQuery({
    queryKey: QUERY_KEYS.all,
    queryFn: () => messageService.getAll(),
  });
}

export function useMessage(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.byId(id),
    queryFn: () => messageService.getById(id),
    enabled: !!id,
  });
}

export function useCreateMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Parameters<typeof messageService.create>[0]) => messageService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
    },
  });
}

export function useMarkMessageRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => messageService.markRead(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
      queryClient.setQueryData(QUERY_KEYS.byId(data.id), data);
    },
  });
}

export function useDeleteMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => messageService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
    },
  });
}
