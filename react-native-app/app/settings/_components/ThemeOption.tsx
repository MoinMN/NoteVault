import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";

const ThemeOption = () => {
  const { mode, setLight, setDark, setSystem } = useTheme();
  return (
    <View className="m-4">
      <Text className="text-lg font-semibold text-black dark:text-white mb-2">
        Appearance
      </Text>

      <View className="bg-gray-100 dark:bg-[#1C1C1E] px-4 py-3 rounded-xl">
        {/* Current Mode Label */}
        <View className="flex-row items-center gap-3 mb-3">
          <MaterialCommunityIcons
            name={
              mode === "dark"
                ? "weather-night"
                : mode === "light"
                  ? "white-balance-sunny"
                  : "theme-light-dark"
            }
            size={22}
            color="#999"
          />
          <Text className="text-black dark:text-white capitalize">
            {mode} Mode
          </Text>
        </View>

        {/* Mode Buttons */}
        <View className="flex-row justify-between gap-2">

          <TouchableOpacity
            onPress={setLight}
            className={`flex-1 py-2 rounded-lg items-center ${mode === "light" ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-700"
              }`}
          >
            <Text className={mode === "light" ? "text-white" : "text-black dark:text-white"}>
              Light
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={setDark}
            className={`flex-1 py-2 rounded-lg items-center ${mode === "dark" ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-700"
              }`}
          >
            <Text className={mode === "dark" ? "text-white" : "text-black dark:text-white"}>
              Dark
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={setSystem}
            className={`flex-1 py-2 rounded-lg items-center ${mode === "system" ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-700"
              }`}
          >
            <Text className={mode === "system" ? "text-white" : "text-black dark:text-white"}>
              System
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
};

export default ThemeOption
