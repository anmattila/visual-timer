import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TimerScreen from "./screens/TimerScreen";
import CalendarScreen from "./screens/CalendarScreen";
import Feather from '@expo/vector-icons/Feather';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarStyle: {
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 16,
        },
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === "Timer") {
            iconName = "clock";
          } else if (route.name === "Calendar") {
            iconName = "calendar";
          }
          return (
            <Feather
              name={iconName}
              size={24}
              color={focused ? "black" : "grey"}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Timer" component={TimerScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
    </Tab.Navigator>
  );
}
