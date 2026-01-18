import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
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

export default function Register() {
  const router = useRouter();

  const { theme } = useTheme() as any; 

  const [loading, setLoading] = useState<boolean>(false);
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
      setAlert({ message: "OTP Sent Successfully!", type: "success" });
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
            <Text className="text-gray-700 dark:text-gray-300 mb-1">Name</Text>
            <TextInput
              placeholder="Enter your name"
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, name: text }))
              }
              className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg px-4 py-3"
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
              className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg px-4 py-3"
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
              className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg px-4 py-3"
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
              className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg px-4 py-3"
              placeholderTextColor={theme === "dark" ? "#A1A1AA" : "#4B5563"}
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

          {/* Sign Up Button */}
          <Pressable
            onPress={handleCheckMailExist}
            disabled={loading}
            className={`py-3 rounded-lg mb-2 flex-row items-center justify-center ${loading ? "bg-blue-400" : "bg-blue-600 dark:bg-blue-500"
              }`}
          >
            {loading ? (
              <>
                <ActivityIndicator size="small" color="white" />
                <Text className="text-white font-semibold text-lg ml-2">
                  Creating account...
                </Text>
              </>
            ) : (
              <Text className="text-white text-center font-semibold text-lg">
                Sign Up
              </Text>
            )}
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

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
