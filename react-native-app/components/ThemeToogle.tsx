import { Text, Pressable } from "react-native";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Pressable className="text-black dark:text-white" onPress={toggleTheme}>
        <Text>Toggle Theme</Text>
      </Pressable>

      <Text>Current: {theme}</Text>
    </>
  );
}
