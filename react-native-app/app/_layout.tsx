import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as PaperProvider } from "react-native-paper";
import { InternetProvider } from "@/context/InternetProvider";
import { AlertProvider } from "@/context/AlertContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import AuthGate from "@/components/AuthGate";
import RootSlot from "@/components/RootSlot";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function Layout() {
  return (
    <ThemeProvider>
      <InternetProvider>
        <AuthProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Provider store={store}>
              <PaperProvider>
                <AlertProvider>
                  <AuthGate>
                    <RootSlot />
                  </AuthGate>
                </AlertProvider>
              </PaperProvider>
            </Provider>
          </GestureHandlerRootView>
        </AuthProvider>
      </InternetProvider>
    </ThemeProvider>
  );
}
