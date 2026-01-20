import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface BackButtonProps {
  redirectTo?: string;
}

const BackButton = ({ redirectTo }: BackButtonProps) => {
  const router = useRouter();

  const handlePress = () => {
    if (redirectTo) {
      router.push(redirectTo as any);
    } else {
      router.back();
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      className="p-2"
    >
      <MaterialCommunityIcons name="arrow-left" size={26} color="#2563EB" />
    </TouchableOpacity>
  );
};

export default BackButton;