import { Image, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function PokemonImage({ imageUrl, isLoading, error, style }) {
  return (
    <>
      {isLoading && <ActivityIndicator />}
      {error && <Text>Error loading image</Text>}
      {imageUrl && <Image style={style} source={{ uri: imageUrl }} />}
    </>
  );
}
// https://react.dev/learn/passing-props-to-a-component
