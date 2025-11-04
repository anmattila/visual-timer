import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TimerScreen from '../screens/TimerScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
     <Tab.Navigator
      screenoptions={{
        headerShown: false,
        tabBarActiveTintColor: 'grey'
      }}
    >
      <Tab.Screen name="Timer" component={TimerScreen} />
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator> 
  )
}