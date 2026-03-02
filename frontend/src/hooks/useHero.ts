import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { heroService, type Hero } from '@/services/hero.service';

const HERO_QUERY_KEY = ['hero'];

export const useHero = () => {
  return useQuery({
    queryKey: HERO_QUERY_KEY,
    queryFn: () => heroService.getActive(),
  });
};

export const useUpdateHero = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Hero>;
    }) => heroService.update(id, data),
    onSuccess: (updatedHero) => {
      // Immediately update the cache with returned data
      queryClient.setQueryData(HERO_QUERY_KEY, updatedHero);
      // Then refetch after 500ms to ensure consistency
      setTimeout(() => {
        queryClient.refetchQueries({ queryKey: HERO_QUERY_KEY });
      }, 500);
    },
  });
};
