import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import AuthGate from "@/components/AuthGate";
import { StatusBar } from "expo-status-bar";
import { Slot } from "expo-router";


const ThemeRoot = () => {
  const { theme } = useTheme();
  return (
    <>
      <StatusBar style={theme === "dark" ? "dark" : "light"} />
      <Slot />
    </>
  )
}

export default function Layout() {

  return (
    <ThemeProvider>
      <AuthProvider>
        <AuthGate>
          <ThemeRoot />
        </AuthGate>
      </AuthProvider>
    </ThemeProvider>
  );
}
