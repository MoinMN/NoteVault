import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import api from "@/lib/api";
import { useTheme } from "@/context/ThemeContext";
import { useAlert } from "@/context/AlertContext";
import ErrorCatch from "@/lib/error-catch";
import OTPInput from "@/components/OTPInput";
import { checkPasswordComplexity } from "@/lib/PasswordCheck";
import { Button, Divider, TextInput as PaperInput } from "react-native-paper";
import GoogleLoginButton from "@/components/GoogleSignInButton";

export default function Register() {
  const router = useRouter();

  const { theme } = useTheme() as any;

  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: ""
  });

  const [passwordError, setPasswordError] = useState<string[]>([]);

  const [showOtp, setShowOtp] = useState(false);

  const { setAlert } = useAlert();

  const handleCheckMailExist = async () => {
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

    const passwordCheckResult = checkPasswordComplexity(formData.password);

    if (!passwordCheckResult.valid) {
      setPasswordError(passwordCheckResult?.errors);
      return;
    } else {
      setPasswordError([]);
    }

    setLoading(true);
    try {
      const response = await api.get("/auth/mail/exist", { params: { email: formData?.email } });
      const res = await response.data;

      if (!res?.success) {
        return setAlert({ message: res?.msg, type: "warning" });
      }
      setShowOtp(true);
    } catch (error) {
      ErrorCatch(error, setAlert);
      // console.log(JSON.stringify(error, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (otp: string) => {
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

    setLoading(true);
    const payload = { ...formData, otp };

    try {
      const response = await api.post("/auth/register", payload);
      const res = await response.data;

      if (!res?.success) throw new Error(res?.msg);

      setAlert({ message: res?.msg, type: "success" });
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        otp: ""
      });
      router.replace("/login");
    } catch (error) {
      ErrorCatch(error, setAlert);
      // console.log(JSON.stringify(error, null, 2));
    } finally {
      setLoading(false);
    }
  }

  if (showOtp) {
    return (
      <OTPInput
        email={formData?.email}
        onSubmit={handleRegister}
        setShowOtp={setShowOtp}
        resendTime={60}
      />
    )
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
            Create Account ✨
          </Text>
          <Text className="text-gray-500 dark:text-gray-400 mb-8">
            Sign up to get started
          </Text>

          {/* Name */}
          <View className="mb-4">
            <PaperInput
              label="Name"
              mode="outlined"
              value={formData.name}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, name: text }))
              }
              contentStyle={{ fontSize: 14 }}
              disabled={loading}
              placeholder="Enter your name"
              outlineColor={theme === "dark" ? "#374151" : "#D1D5DB"}
              activeOutlineColor="#2563EB"
              textColor={theme === "dark" ? "#D1D5DB" : "#111827"}
              placeholderTextColor={theme === "dark" ? "#A1A1AA" : "#6B7280"}
              style={{
                backgroundColor: theme === "dark" ? "#111827" : "#FFFFFF",
              }}
            />
          </View>

          {/* Email */}
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
              disabled={loading}
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
          </View>

          {/* Password */}
          <View className="mb-4">
            <PaperInput
              label="Password"
              mode="outlined"
              value={formData.password}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, password: text }))
              }
              contentStyle={{ fontSize: 14 }}
              disabled={loading}
              secureTextEntry={!showPassword}
              placeholder="Enter your password"
              outlineColor={theme === "dark" ? "#374151" : "#D1D5DB"}
              activeOutlineColor="#2563EB"
              textColor={theme === "dark" ? "#D1D5DB" : "#111827"}
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

          {/* Confirm Password */}
          <View className="mb-6">
            <PaperInput
              label="Confirm Password"
              mode="outlined"
              value={formData.confirmPassword}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, confirmPassword: text }))
              }
              contentStyle={{ fontSize: 14 }}
              disabled={loading}
              secureTextEntry={!showConfirmPassword}
              placeholder="Confirm your password"
              outlineColor={theme === "dark" ? "#374151" : "#D1D5DB"}
              activeOutlineColor="#2563EB"
              textColor={theme === "dark" ? "#D1D5DB" : "#111827"}
              placeholderTextColor={theme === "dark" ? "#A1A1AA" : "#6B7280"}
              style={{
                backgroundColor: theme === "dark" ? "#111827" : "#FFFFFF",
              }}
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
                <Text key={index} className="text-sm text-red-600 dark:text-red-400 leading-5">
                  • {err}
                </Text>
              ))}
            </View>
          )}

          {/* Terms & Conditions */}
          <View className="mb-4 flex-row flex-wrap justify-center">
            <Text className="text-sm text-gray-600 dark:text-gray-400">
              By signing up, you agree to our{" "}
            </Text>
            <Link href="https://notevault.moinnaik.bio/terms" asChild>
              <Text className="text-sm text-blue-600 dark:text-blue-400 font-semibold">
                Terms & Conditions
              </Text>
            </Link>
          </View>

          {/* Sign Up Button */}
          <Button
            mode="contained"
            onPress={handleCheckMailExist}
            loading={loading}
            disabled={loading}
            contentStyle={{ flexDirection: "row", justifyContent: "center", paddingVertical: 2 }}
            style={{
              marginBottom: 10,
              backgroundColor: loading
                ? "#60A5FA"
                : theme === "dark"
                  ? "#3B82F6"
                  : "#2563EB",
              borderRadius: 8,
            }}
          >
            {loading ? (
              <Text className="text-white font-semibold text-md ml-2">
                Creating account...
              </Text>
            ) : (
              <Text className="text-white font-semibold text-md">
                Sign Up
              </Text>
            )}
          </Button>

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

          {/* Divider */}
          <View className="flex-row items-center my-6">
            <Divider style={{ flex: 1 }} />
            <Text
              className="mx-3 text-sm text-gray-500 dark:text-gray-400"
              style={{ fontWeight: "500" }}
            >
              OR
            </Text>
            <Divider style={{ flex: 1 }} />
          </View>

          <View className="mb-7">
            <GoogleLoginButton
              loading={loading}
              setLoading={setLoading}
            />
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
