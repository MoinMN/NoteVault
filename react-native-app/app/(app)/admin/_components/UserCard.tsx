import { View, Text } from "react-native";
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

  const onDeleteConfirmed = () => {
    handleDeleteUsers(selectedIds);
    setSelectedIds([]);
    setModalVisible(false);
  };

  const formatDate = (dateString: string) => {
    const inputDate = new Date(dateString);
    const now = new Date();

    // Remove time (set both to midnight)
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const target = new Date(
      inputDate.getFullYear(),
      inputDate.getMonth(),
      inputDate.getDate()
    );

    const diffDays = Math.floor(
      (today.getTime() - target.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    if (diffDays < 30)
      return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? "s" : ""} ago`;

    // After 30 days → show exact date
    return target.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
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
        <View className="flex-row items-center flex-1 mr-2">
          {/* Avatar from Paper */}
          {user?.profileImage ? (
            <Avatar.Image
              size={40}
              source={{ uri: user.profileImage }}
              style={{
                marginRight: 10
              }}
            />
          ) : (
            <Avatar.Text
              size={40}
              label={user.name?.[0]?.toUpperCase() || "MMN"}
              style={{
                backgroundColor: getAvatarColor(user?.name || "MMN"),
                marginRight: 10
              }}
              color="#FFFFFF"
              labelStyle={{
                fontSize: 16,
                fontWeight: "bold"
              }}
            />
          )}

          {/* Info */}
          <View className="flex-1 min-w-0">
            <View className="flex-row items-center mb-0.5">
              <Text
                className="text-sm font-semibold text-gray-900 dark:text-white mr-1.5"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {user.name}
              </Text>
              {/* Role Badge */}
              {user.role === "admin" &&
                <View className={`px-2 py-0.5 rounded-full ${roleStyle.bg}`}>
                  <Text className={`text-[10px] font-medium ${roleStyle.text}`}>
                    {user.role.toUpperCase()}
                  </Text>
                </View>
              }
            </View>
            <Text
              className="text-xs text-gray-500 dark:text-gray-400"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {user.email}
            </Text>
            {user.createdAt && (
              <Text className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">
                Joined {formatDate(user.createdAt)}
              </Text>
            )}
          </View>
        </View>

        {/* Right Action */}
        {editMode && (
          <Checkbox
            value={selected}
            onValueChange={() => onToggleSelect(user._id)}
            color={selected ? "#2563EB" : undefined}
          />
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