import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Octicons from '@expo/vector-icons/Octicons';
import { useTheme } from "@/context/ThemeContext";
import NotesScreen from "../app/(app)/notes";
import TodosScreen from "../app/(app)/todos";
import React from "react";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const { theme } = useTheme();

  const isDark = theme === "dark";
  const tabBarBg = isDark ? "#121314" : "#F3F4F6"; // gray shades
  const tabBarShadow = isDark ? "#2563EB" : "#D1D5DB"; // subtle shadow color

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: {
          backgroundColor: tabBarBg,
          borderTopWidth: 0,
          position: "absolute",
          marginHorizontal: 8,
          bottom: 8,
          borderRadius: 14,
          height: 60,
          shadowColor: tabBarShadow,
          shadowOpacity: 0.25,
          shadowRadius: 5,
          shadowOffset: { width: 0, height: 5 },
        },
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Todos") {
            return (
              <Octicons
                name={"tasklist"}
                size={focused ? 28 : 24}
                color={color}
              />
            );
          } else if (route.name === "Notes") {
            return (
              <MaterialCommunityIcons
                name={focused ? "file-document" : "file-document-outline"}
                size={focused ? 28 : 24}
                color={color}
              />
            );
          }
        },
      })}
    >
      <Tab.Screen name="Notes" component={NotesScreen} />
      <Tab.Screen name="Todos" component={TodosScreen} />
    </Tab.Navigator>
  )
}

export default Tabs
