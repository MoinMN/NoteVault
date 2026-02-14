import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClose: () => void;
}

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search...",
  onClose
}: SearchBarProps) {
  const { theme } = useTheme() as any;
  const isDark = theme === "dark";

  return (
    <View className="my-2">
      <View className="flex-row items-center bg-gray-100 dark:bg-[#1C1C1E] rounded-xl px-4 py-3">
        <Ionicons
          name="search"
          size={20}
          color={isDark ? "#9CA3AF" : "#6B7280"}
        />

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={isDark ? "#6B7280" : "#9CA3AF"}
          className="flex-1 ml-2 text-gray-900 dark:text-white text-sm"
          autoCapitalize="none"
          autoCorrect={false}
        />

        {value.length > 0 ? (
          <Ionicons
            name="close-circle"
            size={20}
            color={isDark ? "#9CA3AF" : "#6B7280"}
            onPress={() => onChangeText("")}
          />
        ) : (
          <Ionicons
            name="close"
            size={20}
            color={isDark ? "#9CA3AF" : "#6B7280"}
            onPress={() => onClose()}
          />
        )}
      </View>
    </View>
  );
}