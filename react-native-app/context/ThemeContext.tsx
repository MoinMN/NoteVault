import { createContext, ReactNode, useContext, useEffect } from "react";
import { useColorScheme } from "nativewind";

type ThemeType = "light" | "dark";

interface ThemeContextType {
  theme: ThemeType;
  setLight: () => void;
  setDark: () => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { colorScheme, setColorScheme } = useColorScheme();

  // ensure system is used initially
  useEffect(() => {
    setColorScheme("system");
  }, []);

  const setLight = () => setColorScheme("light");
  const setDark = () => setColorScheme("dark");

  const toggleTheme = () => {
    if (colorScheme === "dark") setLight();
    else setDark();
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: colorScheme ?? "light",
        setLight,
        setDark,
        toggleTheme,
      }}
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
