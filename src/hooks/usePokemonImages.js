import { useQuery } from "@tanstack/react-query";
import { fetchPokemonList } from "../services/api";

export default function usePokemonImages(pokemons) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemonImages", pokemons],
    queryFn: () => fetchPokemonList(pokemons),
    staleTime: 1000 * 60 * 90,
    cacheTime: 1000 * 60 * 60 * 12,
  });

  return { data, isLoading, error };
}
