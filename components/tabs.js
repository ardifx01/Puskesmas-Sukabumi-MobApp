import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

import UseIcons from "./middleware/tools/useIcons";

import HomeScreens from "./home_screen";
import HistoryScreen from "./history_screen";
import StockScreen from "./stock_screen";
import ProfileScreen from "./profile_screen";

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName, iconSet;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home";
            iconSet = focused ? "Octicons" : "Octicons";
          } else if (route.name === "Riwayat") {
            iconName = focused ? "history" : "history";
            iconSet = focused ? "Custom" : "Custom";
          } else if (route.name === "Stock Obat") {
            iconName = focused ? "apps" : "apps";
            iconSet = focused ? "Octicons" : "Octicons";
          } else if (route.name === "Profile") {
            iconName = focused ? "user-circle" : "user-circle";
            iconSet = focused ? "FontAwesome6" : "FontAwesome6";
          }

          // You can return any component that you like here!
          return <UseIcons name={iconName} set={iconSet} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#4ACDD1",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreens} />
      <Tab.Screen name="Riwayat" component={HistoryScreen} />
      <Tab.Screen name="Stock Obat" component={StockScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
