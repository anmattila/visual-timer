import axios from "axios";

export async function fetchPokemonImage(id) {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  //const image_url = response.data.sprites.front_default;
  const image = response.data.sprites.other["official-artwork"].front_default;
  return image;
}

export async function fetchPokemonList(pokemons) {
  const promises = await Promise.all(pokemons.map((id) => fetchPokemonImage(id)));
  return promises;
}
