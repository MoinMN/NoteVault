import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Button, TextInput as PaperInput } from "react-native-paper";
import api from "@/lib/api";
import { useAlert } from "@/context/AlertContext";
import OTPInput from "@/components/OTPInput";
import ErrorCatch from "@/lib/error-catch";
import { checkPasswordComplexity } from "@/lib/PasswordCheck";
import { useTheme } from "@/context/ThemeContext";

export default function ForgotPassword() {
  const router = useRouter();
  const { theme } = useTheme() as any;
  const { setAlert } = useAlert();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string[]>([]);

  // Step 1: Send OTP
  const handleSendOTP = async () => {
    if (!email) return setAlert({ type: "error", message: "Email is required" });
    setShowOtp(true); // OTPInput handles API call internally
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (otp: string) => {
    if (!otp) {
      return setAlert({ type: "error", message: "OTP is required" });
    }
    setOtp(otp);
    setLoading(true);
    try {
      const res = await api.post("/auth/forgot-password/verify-otp", { email, otp });
      if (!res.data.success) throw new Error(res.data.msg);
      setAlert({ type: "success", message: "OTP verified!" });
      setShowOtp(false);
      setShowNewPassword(true);
    } catch (error) {
      ErrorCatch(error, setAlert);
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Set New Password
  const handleSetNewPassword = async () => {
    if (!newPassword || !confirmPassword) {
      return setAlert({ type: "error", message: "All fields are required" });
    }

    if (newPassword !== confirmPassword) {
      return setAlert({ type: "error", message: "Passwords do not match" });
    }

    if (!email) {
      return setAlert({ type: "error", message: "Email not found" });
    }
    if (!otp) {
      return setAlert({ type: "error", message: "OTP not found" });
    }

    const passwordCheck = checkPasswordComplexity(newPassword);
    if (!passwordCheck.valid) {
      setPasswordError(passwordCheck.errors);
      return;
    } else {
      setPasswordError([]);
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/forgot-password/reset", {
        email,
        otp,
        newPassword,
      });
      if (!res.data.success) throw new Error(res.data.msg);
      setAlert({ type: "success", message: "Password reset successfully!" });
      router.replace("/login");
    } catch (error) {
      ErrorCatch(error, setAlert);
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
            Forgot Password 🔑
          </Text>
          <Text className="text-gray-500 dark:text-gray-400 mb-8">
            Reset your password easily
          </Text>

          {!showOtp && !showNewPassword && (
            <View className="mb-6">
              <PaperInput
                label="Email"
                mode="outlined"
                value={email}
                onChangeText={setEmail}
                contentStyle={{ fontSize: 14 }}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="Enter your email"
                outlineColor={theme === "dark" ? "#374151" : "#D1D5DB"}
                activeOutlineColor="#2563EB"
                textColor={theme === "dark" ? "#D1D5DB" : "#111827"}
                placeholderTextColor={theme === "dark" ? "#A1A1AA" : "#6B7280"}
                style={{
                  backgroundColor: theme === "dark" ? "#111827" : "#FFFFFF",
                }}
              />
              <Button
                mode="contained"
                onPress={handleSendOTP}
                loading={loading}
                disabled={loading}
                style={{
                  marginTop: 20,
                  borderRadius: 8,
                  backgroundColor: theme === "dark" ? "#3B82F6" : "#2563EB",
                }}
              >
                <Text className="text-white font-semibold text-md">
                  {loading ? "Sending OTP..." : "Send OTP"}
                </Text>
              </Button>
            </View>
          )}

          {showOtp && (
            <OTPInput
              email={email}
              onSubmit={handleVerifyOtp}
              setShowOtp={setShowOtp}
              resendTime={60}
            />
          )}

          {showNewPassword && (
            <View>
              {/* New Password */}
              <View className="mb-4">
                <PaperInput
                  label="New Password"
                  mode="outlined"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry={!showPassword}
                  contentStyle={{ fontSize: 14 }}
                  placeholder="Enter new password"
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

              {passwordError.length > 0 && (
                <View className="mb-2 p-3 rounded-lg border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20">
                  <Text className="text-red-600 dark:text-red-400 font-semibold mb-1">
                    Password requirements:
                  </Text>
                  {passwordError.map((err, index) => (
                    <Text key={index} className="text-sm text-red-600 dark:text-red-400 leading-5">
                      • {err}
                    </Text>
                  ))}
                </View>
              )}

              <Button
                mode="contained"
                onPress={handleSetNewPassword}
                loading={loading}
                disabled={loading}
                style={{
                  marginTop: 20,
                  borderRadius: 8,
                  backgroundColor: theme === "dark" ? "#3B82F6" : "#2563EB",
                }}
              >
                <Text className="text-white font-semibold text-md">
                  {loading ? "Resetting Password..." : "Reset Password"}
                </Text>
              </Button>
            </View>
          )}

          {/* Back to login */}
          <View className="flex-row justify-center mt-6">
            <Text className="text-gray-600 dark:text-gray-400">
              Remember your password?
            </Text>
            <Link href="/login" asChild>
              <Text className="ml-1 text-blue-600 dark:text-blue-400 font-semibold">
                Login
              </Text>
            </Link>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
