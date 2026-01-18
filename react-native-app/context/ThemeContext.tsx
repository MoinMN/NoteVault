import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useColorScheme } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeMode = "light" | "dark" | "system";

interface ThemeContextType {
  theme: "light" | "dark";
  mode: ThemeMode;
  setLight: () => void;
  setDark: () => void;
  setSystem: () => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>("system");

  // Load saved theme on startup
  useEffect(() => {
    (async () => {
      const saved = (await AsyncStorage.getItem("themeMode")) as ThemeMode | null;

      if (saved) {
        setMode(saved);
        setColorScheme(saved);
      } else {
        setColorScheme("system");
      }
    })();
  }, []);

  const saveMode = async (value: ThemeMode) => {
    setMode(value);
    await AsyncStorage.setItem("themeMode", value);
    setColorScheme(value);
  };

  const setLight = () => saveMode("light");
  const setDark = () => saveMode("dark");
  const setSystem = () => saveMode("system");

  const toggleTheme = () => {
    if (mode === "system") {
      // If in system mode, switch based on current
      if (colorScheme === "dark") {
        setLight();
      } else {
        setDark();
      }
    } else {
      if (mode === "dark") {
        setLight();
      } else {
        setDark();
      }
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: colorScheme ?? "light",
        mode,
        setLight,
        setDark,
        setSystem,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};