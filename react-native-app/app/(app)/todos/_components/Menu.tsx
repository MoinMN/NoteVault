import { useRouter } from "expo-router";
import { Dispatch, SetStateAction } from "react";
import { View, Text, TouchableOpacity, Modal, Platform, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ToDoMenuProps = {
  showMenu: boolean,
  setShowMenu: Dispatch<SetStateAction<boolean>>,
  editMode: boolean,
  setEditMode: Dispatch<SetStateAction<boolean>>,
  hideCompletedTodos: boolean,
  setHideCompletedTodos: Dispatch<SetStateAction<boolean>>,
}

const ToDoMenu = ({
  showMenu, setShowMenu, editMode, setEditMode, hideCompletedTodos, setHideCompletedTodos
}: ToDoMenuProps) => {

  const router = useRouter();

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
            top: Platform.OS === "ios" ? 100 : 44,
            right: Platform.OS === "ios" ? 50 : 40,
            width: 180,
            borderRadius: 12,

            // Shadow for iOS
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 8,

            // Shadow for Android
            elevation: 8,
          }}
        >

          {/* Edit */}
          <TouchableOpacity
            style={{ paddingVertical: 12, paddingHorizontal: 14 }}
            activeOpacity={0.7}
            onPress={() => {
              setEditMode((p) => !p);
              setShowMenu(false);
            }}
          >
            <Text className="text-black dark:text-white text-sm">
              {editMode ? "Cancel" : "Edit"}
            </Text>
          </TouchableOpacity>

          <View className="h-px bg-gray-300 dark:bg-gray-700" />

          {/* Hide completed */}
          <TouchableOpacity
            style={{ paddingVertical: 12, paddingHorizontal: 14 }}
            activeOpacity={0.7}
            onPress={() => {
              setHideCompletedTodos((prev) => !prev);
              setShowMenu(false);
            }}
          >
            <Text className="text-black dark:text-white text-sm">
              {hideCompletedTodos ? "Show " : "Hide "}completed
            </Text>
          </TouchableOpacity>

          <View className="h-px bg-gray-300 dark:bg-gray-700" />

          {/* Settings */}
          <TouchableOpacity
            style={{ paddingVertical: 12, paddingHorizontal: 14 }}
            activeOpacity={0.7}
            onPress={() => {
              setShowMenu(false);
              router.push("/settings" as any);
            }}
          >
            <Text className="text-black dark:text-white text-sm">Settings</Text>
          </TouchableOpacity>

        </View>

      </SafeAreaView>
    </Modal>
  )
}

export default ToDoMenu
