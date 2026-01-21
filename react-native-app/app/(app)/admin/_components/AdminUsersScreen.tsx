import { FlatList, RefreshControl } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import UserCard from "./UserCard";

export default function AdminUsersScreen({
  users,
  editMode,
  handleDeleteUsers,
  selectedUsers,
  setSelectedUsers,
  onRefresh,
  refreshing,
}: any) {
  const { theme } = useTheme() as any;
  const isDark = theme === "dark";

  const toggleSelect = (id: string) => {
    setSelectedUsers((prev: string[]) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  return (
    <FlatList
      data={users}
      className="py-4"
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <UserCard
          user={item}
          editMode={editMode}
          selected={selectedUsers.includes(item._id)}
          onToggleSelect={toggleSelect}
          handleDeleteUsers={handleDeleteUsers}
        />
      )}
      contentContainerStyle={{ paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={isDark ? "#FFFFFF" : "#2563EB"}
          colors={["#2563EB"]}
        />
      }
    />
  );
}
