import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, Pressable } from "react-native";
import { Link } from "expo-router";
import { useState } from "react";
import Alert from "../../components/ui/Alert";
import api from "@/lib/api";
import { AxiosError, isAxiosError } from 'axios';
import { useTheme } from "@/context/ThemeContext";

interface LoginErrorData {
  msg?: string;
  success?: boolean;
}

export default function Register() {
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error" | "warning" | "info";
  } | null>(null);

  const handleRegister = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      setAlert({
        message: "All fields are required",
        type: "error",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setAlert({
        message: "Passwords do not match",
        type: "error",
      });
      return;
    }

    try {
      const response = await api.post("/auth/register", formData);
      const res = await response.data;

      if (res?.success) {
        setAlert({ message: res?.msg, type: "success" });
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
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black justify-center px-6">
      {/* Title */}
      <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Create Account ✨
      </Text>
      <Text className="text-gray-500 dark:text-gray-400 mb-8">
        Sign up to get started
      </Text>

      {/* Name */}
      <View className="mb-4">
        <Text className="text-gray-700 dark:text-gray-300 mb-1">Name</Text>
        <TextInput
          placeholder="Enter your name"
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, name: text }))
          }
          className="border border-gray-300 dark:border-gray-700
                 bg-white dark:bg-gray-900
                 text-gray-900 dark:text-white
                 rounded-lg px-4 py-3"
          placeholderTextColor={theme === "dark" ? "#A1A1AA" : "#4B5563"}
        />
      </View>

      {/* Email */}
      <View className="mb-4">
        <Text className="text-gray-700 dark:text-gray-300 mb-1">Email</Text>
        <TextInput
          placeholder="Enter your email"
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, email: text }))
          }
          className="border border-gray-300 dark:border-gray-700
                 bg-white dark:bg-gray-900
                 text-gray-900 dark:text-white
                 rounded-lg px-4 py-3"
          placeholderTextColor={theme === "dark" ? "#A1A1AA" : "#4B5563"}
        />
      </View>

      {/* Password */}
      <View className="mb-4">
        <Text className="text-gray-700 dark:text-gray-300 mb-1">Password</Text>
        <TextInput
          placeholder="Enter your password"
          secureTextEntry
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, password: text }))
          }
          className="border border-gray-300 dark:border-gray-700
                 bg-white dark:bg-gray-900
                 text-gray-900 dark:text-white
                 rounded-lg px-4 py-3"
          placeholderTextColor={theme === "dark" ? "#A1A1AA" : "#4B5563"}
        />
      </View>

      {/* Confirm Password */}
      <View className="mb-6">
        <Text className="text-gray-700 dark:text-gray-300 mb-1">
          Confirm Password
        </Text>
        <TextInput
          placeholder="Confirm your password"
          secureTextEntry
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, confirmPassword: text }))
          }
          className="border border-gray-300 dark:border-gray-700
                 bg-white dark:bg-gray-900
                 text-gray-900 dark:text-white
                 rounded-lg px-4 py-3"
          placeholderTextColor={theme === "dark" ? "#A1A1AA" : "#4B5563"}
        />
      </View>

      {/* Sign Up Button */}
      <Pressable
        onPress={handleRegister}
        className="bg-blue-600 dark:bg-blue-500 py-3 rounded-lg mb-6 active:opacity-80"
      >
        <Text className="text-white text-center font-semibold text-lg">
          Sign Up
        </Text>
      </Pressable>

      {/* Login link */}
      <View className="flex-row justify-center mt-6">
        <Text className="text-gray-600 dark:text-gray-400">
          Already have an account?
        </Text>
        <Link href="/login" asChild>
          <Text className="ml-1 text-blue-600 dark:text-blue-400 font-semibold">
            Login
          </Text>
        </Link>
      </View>

      {/* Alert */}
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
}
