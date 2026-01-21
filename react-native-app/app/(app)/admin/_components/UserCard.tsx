import { View, Text, Pressable } from "react-native";
import { Checkbox } from "expo-checkbox";
import { useState } from "react";
import ConfirmationModal from "@/components/ui/Modal";
import { Avatar } from "react-native-paper";

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getRoleBadgeStyle = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return {
          bg: "bg-emerald-100 dark:bg-emerald-900/30",
          text: "text-emerald-700 dark:text-emerald-400"
        };
      case "user":
        return {
          bg: "bg-blue-100 dark:bg-blue-900/30",
          text: "text-blue-700 dark:text-blue-400"
        };
      default:
        return {
          bg: "bg-gray-100 dark:bg-gray-800",
          text: "text-gray-700 dark:text-gray-400"
        };
    }
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      "#3B82F6", // blue
      "#8B5CF6", // purple
      "#EC4899", // pink
      "#F97316", // orange
      "#10B981", // green
      "#14B8A6", // teal
    ];
    const index = (name?.charCodeAt(0) || 0) % colors.length;
    return colors[index];
  };

  const roleStyle = getRoleBadgeStyle(user.role);

  return (
    <View className="bg-gray-100 dark:bg-[#1C1C1E] px-4 py-3 rounded-xl mb-3">
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center flex-1">
          {/* Avatar from Paper */}
          <Avatar.Text
            size={48}
            label={user.name?.[0]?.toUpperCase() || "U"}
            color="#FFFFFF"
            style={{
              backgroundColor: getAvatarColor(user.name),
              marginRight: 12
            }}
            labelStyle={{
              fontSize: 18,
              fontWeight: "bold"
            }}
          />

          {/* Info */}
          <View className="flex-1">
            <View className="flex-row items-center mb-1">
              <Text className="text-base font-semibold text-gray-900 dark:text-white mr-2">
                {user.name}
              </Text>
              {/* Role Badge */}
              <View className={`px-2.5 py-1 rounded-full ${roleStyle.bg}`}>
                <Text className={`text-xs font-medium ${roleStyle.text}`}>
                  {user.role.toUpperCase()}
                </Text>
              </View>
            </View>
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              {user.email}
            </Text>
            {user.createdAt && (
              <Text className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Joined {formatDate(user.createdAt)}
              </Text>
            )}
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