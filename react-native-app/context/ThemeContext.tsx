import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useColorScheme } from "nativewind";

type ThemeType = "light" | "dark" | "system";

interface ThemeContextType {
  theme: ThemeType;
  setLight: () => void;
  setDark: () => void;
  setSystem: () => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>("system");

  // init as system
  useEffect(() => {
    setColorScheme("system");
    setTheme("system");
  }, []);

  const setLight = () => {
    setColorScheme("light");
    setTheme("light");
  };

  const setDark = () => {
    setColorScheme("dark");
    setTheme("dark");
  };

  const setSystem = () => {
    setColorScheme("system");
    setTheme("system");
  };

  const toggleTheme = () => {
    if (colorScheme === "dark") setLight();
    else setDark();
  };

  return (
    <ThemeContext.Provider
      value={{ theme, setLight, setDark, setSystem, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
};
