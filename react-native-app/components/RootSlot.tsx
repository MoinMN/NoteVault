import { useTheme } from "@/context/ThemeContext";
import { useInternet } from "@/context/InternetProvider";
import NoInternetScreen from "@/components/NoInternetScreen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Slot } from "expo-router";
import { useAlert } from "@/context/AlertContext";
import Alert from "./ui/Alert";

const RootSlot = () => {
  const { theme } = useTheme() as any;
  const { isConnected } = useInternet();
  const { alert, setAlert } = useAlert();

  if (!isConnected) {
    return <NoInternetScreen />;
  }

  return (
    <SafeAreaView
      style={{ flex: 1 }}
      edges={["top", "bottom"]}
      className="bg-white dark:bg-black"
    >
      <StatusBar style={theme === "dark" ? "light" : "dark"} />

      {/* Expo Router renders screens here */}
      <Slot />

      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
    </SafeAreaView>
  );
};

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <RootSlot />
    </SafeAreaProvider>
  );
}
