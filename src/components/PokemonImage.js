import { Image, View, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function PokemonImage({ imageUrl, isLoading, error }) {
  return (
    <View>
      {isLoading && <ActivityIndicator />}
      {error && <Text>Error loading image</Text>}
      {imageUrl && (
        <Image style={{ width: 150, height: 150 }} source={{ uri: imageUrl }} />
      )}
    </View>
  );
}
