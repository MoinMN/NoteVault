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
    <View className="flex-row justify-between items-center py-4 px-2">
      {/* Cancel */}
      <TouchableOpacity
        onPress={() => {
          setEditMode(false);
          setSelectedItems([]);
        }}
      >
        <Text className="text-blue-500 font-semibold">Cancel</Text>
      </TouchableOpacity>

      {/* Delete */}
      <TouchableOpacity
        onPress={onDelete}
        disabled={selectedItems.length === 0}
      >
        <Text
          className={`font-semibold ${selectedItems.length > 0 ? "text-red-500" : "text-gray-400"
            }`}
        >
          Delete
        </Text>
      </TouchableOpacity>

      {/* Select All */}
      <TouchableOpacity onPress={onSelectAll}>
        <Text className="text-blue-500 font-semibold">Select All</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditHead;
