import { useAlert } from "@/context/AlertContext";
import { useTheme } from "@/context/ThemeContext";
import api from "@/lib/api";
import ErrorCatch from "@/lib/error-catch";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useRef, useState, useEffect, Dispatch, SetStateAction } from "react";
import { View, TextInput, Text, TouchableOpacity, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type OTPProps = {
  email: string,
  length?: number;
  onSubmit: (otp: string) => void;
  resendTime?: number; // in seconds
  setShowOtp: Dispatch<SetStateAction<boolean>>;
};

const OTPInput = ({ email, length = 6, onSubmit, setShowOtp, resendTime = 30 }: OTPProps) => {
  const { theme } = useTheme() as any; 
  const { setAlert } = useAlert();

  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const [resendTimer, setResendTimer] = useState(resendTime);
  const [canResend, setCanResend] = useState(false);

  const inputsRef = useRef<(TextInput | null)[]>([]);

  // Auto-submit OTP
  useEffect(() => {
    if (otp.every((d) => d !== "")) {
      onSubmit(otp.join(""));
      Keyboard.dismiss();
    }
  }, [otp]);

  // Resend timer
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // only numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    if (!value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleKeyPress = ({ nativeEvent }: any, index: number) => {
    if (nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleResend = async () => {
    setOtp(Array(length).fill(""));
    inputsRef.current[0]?.focus();
    setResendTimer(resendTime);
    setCanResend(false);

    try {
      const response = await api.patch("/auth/mail/otp", { email });
      if (!response.data?.success) throw new Error(response.data?.msg);

      setAlert({ message: response.data?.msg, type: "success" });
    } catch (error) {
      ErrorCatch(error, setAlert);
    }
  };

  useEffect(() => {
    handleResend();
  }, []);

  const maskEmail = (email: string) => {
    const [name, domain] = email.split("@");
    if (!name) return email;

    const first = name.slice(0, 2);
    const last = name.slice(-2);
    const masked = first + "****" + last;

    return `${masked}@${domain}`;
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">

      {/* Back Button */}
      <View className="px-4 pt-2">
        <TouchableOpacity
          onPress={() => setShowOtp(false)}
          className="w-10 h-10 rounded-full items-center justify-center bg-gray-200 dark:bg-[#1C1C1E]"
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={22}
            color={theme === "dark" ? "#fff" : "#000"}
          />
        </TouchableOpacity>
      </View>

      <View className="flex-1 justify-center items-center">

        <View className="w-full max-w-[360px] p-6 rounded-2xl shadow-md">

          <Text className="text-2xl font-bold text-black dark:text-white text-center mb-2">
            Enter OTP
          </Text>

          <Text className="text-center text-gray-600 dark:text-gray-400 mb-2">
            Code sent to
          </Text>

          <Text className="text-center font-semibold text-blue-600 dark:text-blue-400 mb-8">
            {maskEmail(email)}
          </Text>

          {/* OTP Boxes */}
          <View className="flex-row justify-between gap-1 mb-4">
            {Array(length).fill(0).map((_, index) => (
              <TextInput
                key={index}
                ref={(el) => { inputsRef.current[index] = el }}
                value={otp[index]}
                onChangeText={(value) => handleChange(value, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                className={`w-11 h-14 rounded-xl border-2 text-center text-xl font-semibold ${otp[index]
                  ? "border-blue-600 dark:border-blue-500"
                  : "border-gray-300 dark:border-gray-700"
                  } text-black dark:text-white`}
                autoFocus={index === 0}
                textContentType="oneTimeCode"
              />
            ))}
          </View>

          {/* Resend */}
          <TouchableOpacity
            onPress={handleResend}
            disabled={!canResend}
            className={`mt-6 ${canResend ? "opacity-100" : "opacity-50"}`}
          >
            <Text className="text-blue-600 dark:text-blue-400 font-semibold text-center">
              {canResend ? "Resend OTP" : `Resend in ${resendTimer}s`}
            </Text>
          </TouchableOpacity>

        </View>

      </View>

    </SafeAreaView>
  );
};

export default OTPInput;
