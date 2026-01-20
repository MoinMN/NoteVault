import { Dispatch, SetStateAction } from "react";
import { TouchableOpacity, View, Text } from "react-native";

type EditHeadProps<T> = {
  setEditMode: Dispatch<SetStateAction<boolean>>;
  selectedItems: T[];
  setSelectedItems: Dispatch<SetStateAction<T[]>>;
  onDelete: () => void;
  onSelectAll: () => void;
};

const EditHead = <T,>({
  setEditMode,
  selectedItems,
  setSelectedItems,
  onDelete,
  onSelectAll,
}: EditHeadProps<T>) => {
  return (
    <View className="flex-row justify-between items-center py-4">
      {/* Cancel */}
      <TouchableOpacity
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        onPress={() => {
          setEditMode(false);
          setSelectedItems([]);
        }}
        className="p-2"
      >
        <Text className="text-blue-500 font-semibold">Cancel</Text>
      </TouchableOpacity>

      {/* Delete */}
      <TouchableOpacity
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        onPress={onDelete}
        disabled={selectedItems.length === 0}
        className="p-2"
      >
        <Text
          className={`font-semibold ${selectedItems.length > 0 ? "text-red-500" : "text-gray-400"
            }`}
        >
          Delete
        </Text>
      </TouchableOpacity>

      {/* Select All */}
      <TouchableOpacity
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        onPress={onSelectAll}
        className="p-2"
      >
        <Text className="text-blue-500 font-semibold">Select All</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditHead;
