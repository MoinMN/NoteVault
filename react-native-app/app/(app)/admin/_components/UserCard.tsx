import { View, Text, Pressable } from "react-native";
import { Checkbox } from "expo-checkbox";
import { useState } from "react";
import ConfirmationModal from "@/components/ui/Modal";

export default function UserCard({
  user,
  editMode,
  selected,
  onToggleSelect,
  handleDeleteUsers,
}: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const confirmDelete = (ids: string[]) => {
    setSelectedIds(ids);
    setModalVisible(true);
  };

  const onDeleteConfirmed = () => {
    handleDeleteUsers(selectedIds);
    setSelectedIds([]);
    setModalVisible(false);
  };

  return (
    <View className="bg-gray-100 dark:bg-[#1C1C1E] px-4 py-3 rounded-xl mb-3">
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center flex-1">
          {/* Avatar */}
          <View className="w-10 h-10 rounded-full bg-blue-500 items-center justify-center mr-3">
            <Text className="text-white font-bold">
              {user.name?.[0]?.toUpperCase()}
            </Text>
          </View>

          {/* Info */}
          <View className="flex-1">
            <Text className="text-base font-semibold text-black dark:text-white">
              {user.name}
            </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              {user.email}
            </Text>
            <Text className="text-xs text-blue-500 mt-1">
              {user.role.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Right Action */}
        {editMode ? (
          <Checkbox
            value={selected}
            onValueChange={() => onToggleSelect(user._id)}
            color={selected ? "#2563EB" : undefined}
          />
        ) : (
          <Pressable
            onPress={() => confirmDelete([user._id])}
            className="bg-red-500 px-3 py-1 rounded-md"
          >
            <Text className="text-white text-sm font-semibold">Delete</Text>
          </Pressable>
        )}
      </View>

      {/* Confirmation Modal */}
      <ConfirmationModal
        visible={modalVisible}
        setVisible={setModalVisible}
        title="Delete Users"
        description="Are you sure you want to delete selected user(s)? This action cannot be undone."
        actionText="Delete"
        actionColor="#DC2626"
        onAction={onDeleteConfirmed}
      />
    </View>
  );
}
