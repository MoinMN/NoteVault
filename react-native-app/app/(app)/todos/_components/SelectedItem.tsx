import { Dispatch, SetStateAction } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

type SelectableItemProps = {
  id: string;
  title: string;
  completed?: boolean;
  editMode: boolean;
  selectedItems: string[];
  setEditMode: Dispatch<SetStateAction<boolean>>;
  setSelectedItems: Dispatch<SetStateAction<string[]>>;
  toggleTodoStatus?: (id: string) => void; // for pending/completed toggle
  onPressItem?: () => void; // normal press action
  delayLongPress?: number;
};

const SelectableItem = ({
  id,
  title,
  completed = false,
  editMode,
  selectedItems,
  setSelectedItems,
  toggleTodoStatus,
  onPressItem,
  setEditMode,
  delayLongPress = 300,
}: SelectableItemProps) => {
  const isSelected = selectedItems.includes(id);

  const toggleSelect = () => {
    if (isSelected) {
      setSelectedItems(selectedItems.filter((sid) => sid !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      delayLongPress={delayLongPress}
      onLongPress={() => {
        if (!editMode) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          setEditMode(true);
          setSelectedItems([id]);
        }
      }}
      onPress={() => {
        if (editMode) toggleSelect();
        else onPressItem?.();
      }}
      className="flex-row items-center py-3"
    >
      {/* Checkbox */}
      {editMode ? (
        <View
          className={`w-5 h-5 rounded border-2 mr-3 items-center justify-center ${isSelected ? "bg-blue-500 border-blue-500" : "border-gray-400"
            }`}
        >
          {isSelected && <MaterialCommunityIcons name="check" size={16} color="white" />}
        </View>
      ) : completed ? (
        <MaterialCommunityIcons
          name="check-circle"
          size={20}
          color="gray"
          style={{ marginRight: 12 }}
          onPress={() => toggleTodoStatus?.(id)}
        />
      ) : (
        <TouchableOpacity
          className="w-5 h-5 rounded-full border-2 border-gray-400 mr-3"
          onPress={() => toggleTodoStatus?.(id)}
        />
      )}

      {/* Title */}
      <View className="flex-1">
        <Text className={`text-base ${completed ? "text-gray-400" : "text-black"} dark:text-white`}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SelectableItem;
