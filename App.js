import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PaperProvider } from "react-native-paper";
import * as NavigationBar from 'expo-navigation-bar';
import TabNavigator from "./src/TabNavigator";

export default function App() {
  const queryClient = new QueryClient();
  NavigationBar.setVisibilityAsync("hidden");

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <QueryClientProvider client={queryClient}>
            <NavigationContainer>
              <TabNavigator />
            </NavigationContainer>
        </QueryClientProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
