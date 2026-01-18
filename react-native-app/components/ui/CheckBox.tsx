import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";

const Checkbox = ({ checked }: { checked: boolean }) => (
  <View
    className={`w-5 h-5 rounded border-2 items-center justify-center
      ${checked ? "bg-blue-500 border-blue-500" : "border-gray-400"}
    `}
  >
    {checked && (
      <MaterialCommunityIcons name="check" size={14} color="white" />
    )}
  </View>
);

export default Checkbox;
