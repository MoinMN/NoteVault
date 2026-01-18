import { useRouter } from "expo-router";
import { Dispatch, SetStateAction } from "react";
import { View, Text, TouchableOpacity, Modal, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

type SortType = "created" | "edited";

type NotesMenuProps = {
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
  editMode: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  gridView: boolean;
  setGridView: Dispatch<SetStateAction<boolean>>;
  sortBy: SortType;
  setSortBy: Dispatch<SetStateAction<SortType>>;
};

const NotesMenu = ({
  showMenu,
  setShowMenu,
  editMode,
  setEditMode,
  gridView,
  setGridView,
  sortBy,
  setSortBy,
}: NotesMenuProps) => {
  const router = useRouter();

  const MenuItem = ({
    label, onPress, checked = false
  }: {
    label: string; onPress: () => void; checked?: boolean;
  }) => (
    <TouchableOpacity
      className="flex-row items-center justify-between px-4 py-3"
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text className="text-black dark:text-white text-sm">{label}</Text>
      {checked && (
        <MaterialCommunityIcons
          name="check"
          size={16}
          color="#22C55E"
        />
      )}
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={showMenu}
      transparent
      animationType="fade"
      onRequestClose={() => setShowMenu(false)}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {/* Backdrop */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowMenu(false)}
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.1)",
          }}
        />

        {/* Menu */}
        <View
          className="bg-white dark:bg-[#121314] rounded-xl overflow-hidden"
          style={{
            position: "absolute",
            top: Platform.OS === "ios" ? 100 : 44, // safe offset for notch/status bar
            right: Platform.OS === "ios" ? 50 : 40,
            width: 220,
            borderRadius: 12,
            elevation: 8, // Android shadow
            shadowColor: "#000", // iOS shadow
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 8,
          }}
        >
          {/* Edit */}
          <MenuItem
            label={editMode ? "Cancel" : "Edit"}
            onPress={() => {
              setEditMode((p) => !p);
              setShowMenu(false);
            }}
          />

          <View className="h-px bg-gray-300 dark:bg-gray-700" />

          {/* Grid view */}
          <MenuItem
            label={gridView ? "List view" : "Grid view"}
            onPress={() => {
              setGridView((p) => !p);
              setShowMenu(false);
            }}
          />

          <View className="h-px bg-gray-300 dark:bg-gray-700" />

          {/* Sort */}
          <MenuItem
            label="Sort by time created"
            checked={sortBy === "created"}
            onPress={() => {
              setSortBy("created");
              setShowMenu(false);
            }}
          />
          <MenuItem
            label="Sort by time edited"
            checked={sortBy === "edited"}
            onPress={() => {
              setSortBy("edited");
              setShowMenu(false);
            }}
          />

          <View className="h-px bg-gray-300 dark:bg-gray-700" />

          {/* Settings */}
          <MenuItem
            label="Settings"
            onPress={() => {
              setShowMenu(false);
              router.push("/settings" as any);
            }}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default NotesMenu;
