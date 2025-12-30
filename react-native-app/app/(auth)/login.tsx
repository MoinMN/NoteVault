import { View, Text, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../context/AuthContext";
import * as SecureStore from "expo-secure-store";
import { AxiosError, isAxiosError } from 'axios';
import Alert from "../../components/ui/Alert";
import { Link, useRouter } from "expo-router";
import { useState, useContext } from "react";
import api from "../../lib/api";
import { useTheme } from "@/context/ThemeContext";

interface LoginErrorData {
  msg?: string;
  success?: boolean;
}

const Login = () => {
  const router = useRouter();
  const { theme } = useTheme();

  // form data
  const [formData, setFormData] = useState<{
    email: string, password: string
  }>({ email: "", password: "" });

  // alert data
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error" | "warning" | "info";
  } | null>(null);

  const { refreshAuth } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      return setAlert({ message: "All fields are required", type: "error" });
    }
    try {
      const response = await api.post("/auth/login", formData);
      const res = await response.data;
      if (res.success) {
        await SecureStore.setItemAsync("auth_token", res.token);
        setAlert({ message: res?.msg, type: "success" });
        // tell context auth changed
        await refreshAuth();
        router.replace("/todos");
      } else {
        setAlert({ message: res?.msg, type: "warning" });
      }
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const axiosError = error as AxiosError<LoginErrorData>;
        const serverMsg = axiosError.response?.data?.msg;

        setAlert({
          message: serverMsg || error.message || "Network Error",
          type: "error"
        });
      } else {
        setAlert({
          message: error instanceof Error ? error.message : "An unexpected error occurred",
          type: "error"
        });
      }
      // console.log(JSON.stringify(error, null, 2));
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black justify-center px-6">
      {/* Title */}
      <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Welcome Back 👋
      </Text>
      <Text className="text-gray-500 dark:text-gray-400 mb-8">
        Sign in to continue
      </Text>

      {/* Email Input */}
      <View className="mb-4">
        <Text className="text-gray-700 dark:text-gray-300 mb-1">Email</Text>
        <TextInput
          placeholder="Enter your email"
          autoCapitalize="none"
          onChangeText={(text) => setFormData((prev) => ({ ...prev, email: text }))}
          keyboardType="email-address"
          className="border border-gray-300 dark:border-gray-700
                 bg-white dark:bg-gray-900
                 text-gray-900 dark:text-white
                 rounded-lg px-4 py-3"
          placeholderTextColor={theme === "dark" ? "#A1A1AA" : "#4B5563"}
        />
      </View>

      {/* Password Input */}
      <View className="mb-6">
        <Text className="text-gray-700 dark:text-gray-300 mb-1">Password</Text>
        <TextInput
          placeholder="Enter your password"
          secureTextEntry
          onChangeText={(text) => setFormData((prev) => ({ ...prev, password: text }))}
          className="border border-gray-300 dark:border-gray-700
                 bg-white dark:bg-gray-900
                 text-gray-900 dark:text-white
                 rounded-lg px-4 py-3"
          placeholderTextColor={theme === "dark" ? "#A1A1AA" : "#4B5563"}
        />
      </View>

      {/* Login Button */}
      <Pressable onPress={handleLogin} className="bg-blue-600 dark:bg-blue-500 py-3 rounded-lg mb-6">
        <Text className="text-white text-center font-semibold text-lg">
          Login
        </Text>
      </Pressable>

      {/* Sign up link */}
      <View className="flex-row justify-center mt-6">
        <Text className="text-gray-600 dark:text-gray-400">
          Dont have an account?
        </Text>
        <Link href="/register" asChild>
          <Pressable>
            <Text className="ml-1 text-blue-600 dark:text-blue-400 font-semibold">
              Create one
            </Text>
          </Pressable>
        </Link>
      </View>

      {/* alert box */}
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          position="top"
          onClose={() => setAlert(null)}
        />
      )}

    </SafeAreaView>
  );
};

export default Login;