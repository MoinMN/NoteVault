import { useTheme } from "@/context/ThemeContext";
import { useInternet } from "@/context/InternetProvider";
import NoInternetScreen from "@/components/NoInternetScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Slot } from "expo-router";
import { useAlert } from "@/context/AlertContext";
import Alert from "./ui/Alert";

const RootSlot = () => {
  const { theme } = useTheme();
  const { isConnected } = useInternet();
  const { alert, setAlert } = useAlert();

  if (!isConnected) {
    return <NoInternetScreen />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <Slot screenOptions={{ headerShown: false }} />

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

export default RootSlot;
