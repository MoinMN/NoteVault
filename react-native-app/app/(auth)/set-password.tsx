import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Button, TextInput as PaperInput } from "react-native-paper";
import api from "@/lib/api";
import { useAlert } from "@/context/AlertContext";
import { checkPasswordComplexity } from "@/lib/PasswordCheck";
import { useTheme } from "@/context/ThemeContext";
import * as SecureStore from "expo-secure-store";
import { useUser } from "@/context/AuthContext";

export default function SetPassword() {
  const router = useRouter();
  const params = useLocalSearchParams(); // get googleIdToken
  const { theme } = useTheme() as any;
  const { setAlert } = useAlert();
  const { refreshAuth } = useUser();

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string[]>([]);

  const handleSetPassword = async () => {
    if (!password || !confirmPassword) {
      return setAlert({ type: "error", message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return setAlert({ type: "error", message: "Passwords do not match" });
    }

    const passwordCheck = checkPasswordComplexity(password);
    if (!passwordCheck.valid) {
      setPasswordError(passwordCheck.errors);
      return;
    } else {
      setPasswordError([]);
    }

    if (!params.googleIdToken) {
      return setAlert({ type: "error", message: "Invalid session. Try again." });
    }

    setLoading(true);
    try {
      // Step 1: Set password
      const res = await api.post("/auth/set-password", {
        password,
        googleIdToken: params.googleIdToken,
      });

      if (!res.data.success) throw new Error(res.data.msg);

      // Save JWT
      if (res.data.token) {
        await SecureStore.setItemAsync("auth_token", res.data.token);
        await refreshAuth();
      }

      // Step 2: Fetch decrypted master key from backend
      const masterKeyRes = await api.get("/auth/master-key");
      if (!masterKeyRes.data.success || !masterKeyRes.data.masterKey) {
        throw new Error("Failed to fetch master key");
      }

      // Step 3: Store master key locally
      await SecureStore.setItemAsync("master_key", masterKeyRes.data.masterKey);

      setAlert({ type: "success", message: "Password set and master key saved!" });
      router.replace("/todos"); // redirect to main app

    } catch (error: any) {
      setAlert({
        type: "error",
        message: error?.response?.data?.msg || error?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

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
            justifyContent: "center",
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Set Your Password 🔐
          </Text>
          <Text className="text-gray-500 dark:text-gray-400 mb-8">
            Create a password to secure your encrypted notes
          </Text>

          {/* Password */}
          <View className="mb-4">
            <PaperInput
              label="Password"
              mode="outlined"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              contentStyle={{ fontSize: 14 }}
              placeholder="Enter password"
              outlineColor={theme === "dark" ? "#374151" : "#D1D5DB"}
              activeOutlineColor="#2563EB"
              textColor={theme === "dark" ? "#D1D5DB" : "#111827"}
              placeholderTextColor={theme === "dark" ? "#A1A1AA" : "#6B7280"}
              style={{ backgroundColor: theme === "dark" ? "#111827" : "#FFFFFF" }}
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

          {/* Confirm Password */}
          <View className="mb-4">
            <PaperInput
              label="Confirm Password"
              mode="outlined"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              contentStyle={{ fontSize: 14 }}
              placeholder="Confirm password"
              outlineColor={theme === "dark" ? "#374151" : "#D1D5DB"}
              activeOutlineColor="#2563EB"
              textColor={theme === "dark" ? "#D1D5DB" : "#111827"}
              placeholderTextColor={theme === "dark" ? "#A1A1AA" : "#6B7280"}
              style={{ backgroundColor: theme === "dark" ? "#111827" : "#FFFFFF" }}
              right={
                <PaperInput.Icon
                  icon={showConfirmPassword ? "eye" : "eye-off"}
                  size={18}
                  onPress={() => setShowConfirmPassword((prev) => !prev)}
                  color={theme === "dark" ? "#D1D5DB" : "#111827"}
                />
              }
            />
          </View>

          {/* Password Errors */}
          {passwordError.length > 0 && (
            <View className="mb-2 p-3 rounded-lg border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20">
              <Text className="text-red-600 dark:text-red-400 font-semibold mb-1">
                Password requirements:
              </Text>
              {passwordError.map((err, index) => (
                <Text
                  key={index}
                  className="text-sm text-red-600 dark:text-red-400 leading-5"
                >
                  • {err}
                </Text>
              ))}
            </View>
          )}

          <Button
            mode="contained"
            onPress={handleSetPassword}
            loading={loading}
            disabled={loading}
            style={{
              marginTop: 20,
              borderRadius: 8,
              backgroundColor: theme === "dark" ? "#3B82F6" : "#2563EB",
            }}
          >
            <Text className="text-white font-semibold text-md">
              {loading ? "Setting Password..." : "Set Password"}
            </Text>
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
