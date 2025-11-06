import { Image } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import usePokemonImage from "../hooks/usePokemon";

export default function PokemonImage({ id }) {

  const { data, isLoading, error } = usePokemonImage(id);

  if (isLoading || !data) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Error loading image</Text>
  }

  return (
    <Image
      style={{ width: 150, height: 150 }}
      source={{ uri: data }} 
    />
  )
}