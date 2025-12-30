import { View, Text } from "react-native";
import { useEffect } from "react";

type AlertType = "success" | "error" | "warning" | "info";
type AlertPosition = "top" | "center" | "bottom";

interface AlertProps {
  message: string;
  type?: AlertType;
  position?: AlertPosition;
  onClose: () => void;
  duration?: number;
}

const alertStyles: Record<AlertType, string> = {
  success: "bg-green-100 border-green-500 text-green-800",
  error: "bg-red-100 border-red-500 text-red-800",
  warning: "bg-yellow-100 border-yellow-500 text-yellow-800",
  info: "bg-blue-100 border-blue-500 text-blue-800",
};

const positionStyles: Record<AlertPosition, string> = {
  top: "top-12",
  center: "top-1/2 -translate-y-1/2",
  bottom: "bottom-12",
};

export default function Alert({
  message,
  type = "info",
  position = "top",
  onClose,
  duration = 5000,
}: AlertProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <View className={`absolute left-4 right-4 ${positionStyles[position]}`}>
      <View
        className={`border-l-4 p-4 rounded-lg ${alertStyles[type]} shadow`}
      >
        <Text className="font-medium text-left">
          {message}
        </Text>
      </View>
    </View>
  );
}
