import {
  StyleSheet,
  View,
  Alert,
  TouchableHighlight,
  Image,
} from "react-native";
import { Text, Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
export default function SettingsScreen() {

  return (
    <SafeAreaView style={styles.container}>
      <Text variant="bodyLarge">Select your favorite Pokemon</Text>


      <Text>Sound notification for finished timer</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
})