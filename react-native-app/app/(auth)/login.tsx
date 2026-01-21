import { View, Text, Pressable, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, TextInput as PaperInput } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import api from "../../lib/api";
import { useTheme } from "@/context/ThemeContext";
import { useAlert } from "@/context/AlertContext";
import { useUser } from "@/context/AuthContext";
import ErrorCatch from "@/lib/error-catch";

const Login = () => {
  const router = useRouter();
  const { theme } = useTheme() as any;

  // form data
  const [formData, setFormData] = useState<{
    email: string, password: string
  }>({ email: "", password: "" });

  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // alert data
  const { setAlert } = useAlert();

  const { refreshAuth } = useUser();

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      return setAlert({ message: "All fields are required", type: "error" });
    }
    setLoading(true);
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
    } catch (error) {
      ErrorCatch(error, setAlert);
      // console.log(JSON.stringify(error, null, 2));
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black justify-center">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
            paddingVertical: 10,
            justifyContent: "center"
          }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}
        >
          {/* Title */}
          <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome Back 👋
          </Text>
          <Text className="text-gray-500 dark:text-gray-400 mb-8">
            Sign in to continue
          </Text>

          {/* Email Input */}
          <View className="mb-4">
            <PaperInput
              label="Email"
              mode="outlined"
              value={formData.email}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, email: text }))
              }
              contentStyle={{ fontSize: 14 }}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="Enter your email"
              outlineColor={theme === "dark" ? "#374151" : "#D1D5DB"}
              activeOutlineColor="#2563EB"
              textColor={theme === "dark" ? "#D1D5DB" : "#111827"}
              placeholderTextColor={theme === "dark" ? "#A1A1AA" : "#6B7280"}
              style={{
                backgroundColor: theme === "dark" ? "#111827" : "#D1D5DB",
              }}
            />
          </View>

          {/* Password Input */}
          <View className="mb-6">
            <PaperInput
              label="Password"
              mode="outlined"
              value={formData.password}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, password: text }))
              }
              contentStyle={{ fontSize: 14 }}
              secureTextEntry={!showPassword}
              placeholder="Enter your password"
              outlineColor={theme === "dark" ? "#374151" : "#D1D5DB"}
              activeOutlineColor="#2563EB"
              textColor={theme === "dark" ? "#FFFFFF" : "#111827"}
              placeholderTextColor={theme === "dark" ? "#A1A1AA" : "#6B7280"}
              style={{
                backgroundColor: theme === "dark" ? "#111827" : "#FFFFFF",
              }}
              right={
                <PaperInput.Icon
                  icon={showPassword ? "eye" : "eye-off"}
                  size={18}
                  onPress={() => setShowPassword((prev) => !prev)}
                  color={theme === "dark" ? "#D1D5DB" : "#111827"}
                />
              }
            />
          </View>

          {/* Login Button */}
          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            contentStyle={{
              height: 48,
              justifyContent: "center",
            }}
            labelStyle={{
              fontSize: 14,
              fontWeight: "600",
            }}
            style={{
              borderRadius: 8,
              marginBottom: 24,
              backgroundColor: loading ? "#60A5FA" : "#2563EB",
            }}
          >
            {loading ? (
              <Text className="text-white font-semibold text-lg ml-2">
                Logging in...
              </Text>
            ) : (
              <Text className="text-white font-semibold text-lg">
                Login
              </Text>
            )}
          </Button>

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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;