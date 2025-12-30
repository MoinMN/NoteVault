import { Tabs } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "./navbar";

export default function AppLayout() {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <Navbar title="NA" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#2563EB",
          tabBarInactiveTintColor: "#6B7280",
          tabBarStyle: { backgroundColor: "#F9FAFB" },
        }}
      >
        <Tabs.Screen
          name="todos"
          options={{
            title: "Todos",
            tabBarIcon: ({ color }) => <Text style={{ color }}>📝</Text>,
          }}
        />
        <Tabs.Screen
          name="notes"
          options={{
            title: "Notes",
            tabBarIcon: ({ color }) => <Text style={{ color }}>📒</Text>,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
