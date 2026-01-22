import { View, Text, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";

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
    <View className="absolute top-14 w-full items-center z-50 px-4">
      <View
        className={`flex-row items-center justify-between border-l-4 px-4 py-3 rounded-xl ${alertStyles[type]} shadow-lg`}
        style={{
          minWidth: 240,
          maxWidth: "100%",
          elevation: 6, // Android shadow
        }}
      >
        {/* Message */}
        <Text className="flex-1 text-sm font-medium pr-3">
          {message}
        </Text>

        {/* Close Icon */}
        <TouchableOpacity onPress={onClose} hitSlop={10}>
          <MaterialIcons
            name="close"
            size={18}
            color="rgba(0,0,0,0.6)"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
