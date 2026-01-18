import { View, Text } from "react-native";
import { useEffect } from "react";

type AlertType = "success" | "error" | "warning" | "info";

interface AlertProps {
  message: string;
  type?: AlertType;
  onClose: () => void;
  duration?: number;
}

const alertStyles: Record<AlertType, string> = {
  success: "bg-green-100 border-green-500 text-green-800",
  error: "bg-red-100 border-red-500 text-red-800",
  warning: "bg-yellow-100 border-yellow-500 text-yellow-800",
  info: "bg-blue-100 border-blue-500 text-blue-800",
};

export default function Alert({
  message,
  type = "info",
  onClose,
  duration = 3000,
}: AlertProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <View className="absolute top-14 w-full items-center z-50">
      <View
        className={`border-l-4 p-3 rounded-md ${alertStyles[type]} shadow-md`}
        style={{ minWidth: 200, maxWidth: '90%' }}
      >
        <Text className="font-medium text-sm text-center">
          {message}
        </Text>
      </View>
    </View>
  );
}
