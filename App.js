import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabNavigator from './src/navigation/TabNavigation';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {/* <SafeAreaProvider> */}
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      {/* </SafeAreaProvider> */}
    </QueryClientProvider>
  );
}