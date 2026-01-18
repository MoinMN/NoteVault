import { InternetProvider } from "@/context/InternetProvider";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import AuthGate from "@/components/AuthGate";
import RootSlot from "@/components/RootSlot";
import { AlertProvider } from "@/context/AlertContext";

export default function Layout() {
  return (
    <ThemeProvider>
      <InternetProvider>
        <AuthProvider>
          <AlertProvider>
            <AuthGate>
              <RootSlot />
            </AuthGate>
          </AlertProvider>
        </AuthProvider>
      </InternetProvider>
    </ThemeProvider>
  );
}
