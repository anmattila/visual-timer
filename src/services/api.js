import axios from "axios";

export async function fetchApiData(id) {
  
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    //const image_url = response.data.sprites.front_default;
    const image_url = response.data.sprites.other["official-artwork"].front_default;
    return image_url;
}