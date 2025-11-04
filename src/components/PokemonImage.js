import { StyleSheet, View, Image } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import usePokemonImage from "../hooks/usePokemon";

export default function PokemonImage({ id }) {

  const { data, isLoading, error } = usePokemonImage(id);

  return (
    <View style={styles.container}>
      {data ? (
        <Image
          style={styles.image}
          source={{ uri: data }}
        />
      ) : isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text>Error loading image</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  },
  image: {
    width: 100,
    height: 100,
  },
})