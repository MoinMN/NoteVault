import { View, Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar({ title }: { title: string }) {
  const { theme } = useTheme();

  const iconColor = theme === "dark" ? "#FFF" : "#000";
  const bgColor = theme === "dark" ? "bg-gray-900" : "bg-white";

  return (
    <View
      className={`flex-row items-center justify-between px-4 py-3 ${bgColor} border-b ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
    >
      {/* Left: Search */}
      <Pressable>
        <Feather name="search" size={24} color={iconColor} />
      </Pressable>

      {/* Title */}
      <Text className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>
        {title}
      </Text>

      {/* Right: More */}
      <Pressable>
        <Feather name="more-vertical" size={24} color={iconColor} />
      </Pressable>
    </View>
  );
}
