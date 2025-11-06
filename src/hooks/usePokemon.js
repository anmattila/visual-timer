import { useQuery } from "@tanstack/react-query";
import { fetchApiData } from "../services/api";

export default function usePokemonImage(id) {

  const { data, isLoading, error } = useQuery({
    queryKey: ['pokemon-image', id],
    queryFn: () => fetchApiData(id),
    staleTime: 1000 * 60 * 90,
    cacheTime: 1000 * 60 * 60 * 12,
  });

  return { data, isLoading, error };
}