import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import AuthGate from "@/components/AuthGate";
import { StatusBar } from "expo-status-bar";
import { Slot } from "expo-router";

export default function Layout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AuthGate>
          <StatusBar style="dark" />
          <Slot />
        </AuthGate>
      </AuthProvider>
    </ThemeProvider>
  );
}
