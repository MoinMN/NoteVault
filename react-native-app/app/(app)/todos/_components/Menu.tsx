import { useRouter } from "expo-router";
import { Dispatch, SetStateAction, useMemo } from "react";
import { Divider, Menu } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { TouchableOpacity } from "react-native";

type ToDoMenuProps = {
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
  editMode: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  hideCompletedTodos: boolean;
  setHideCompletedTodos: Dispatch<SetStateAction<boolean>>;
};

const ToDoMenu = ({
  showMenu,
  setShowMenu,
  editMode,
  setEditMode,
  hideCompletedTodos,
  setHideCompletedTodos,
}: ToDoMenuProps) => {
  const router = useRouter();
  const theme = useTheme()?.theme || "light";

  const { textColor, bgColor } = useMemo(() => ({
    textColor: theme === "dark" ? "#FFFFFF" : "#121314",
    bgColor: theme === "dark" ? "#121314" : "#FFFFFF",
  }), [theme]);

  return (
    <Menu
      visible={showMenu}
      onDismiss={() => setShowMenu(false)}
      anchor={
        <TouchableOpacity
          onPress={() => setShowMenu(true)}
          style={{
            paddingHorizontal: 60,
            paddingVertical: 6,
          }}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color="gray"
            style={{ opacity: showMenu ? 0 : 1 }}
          />
        </TouchableOpacity>
      }
      contentStyle={{
        backgroundColor: bgColor,
        borderRadius: 12,
        paddingVertical: 1,
        minWidth: 170,
      }}
    >
      <Menu.Item
        title={editMode ? "Cancel" : "Edit"}
        titleStyle={{ color: textColor, fontSize: 14 }}
        onPress={() => {
          setEditMode((p) => !p);
          setShowMenu(false);
        }}
      />

      <Divider />

      <Menu.Item
        title={hideCompletedTodos ? "Show completed" : "Hide completed"}
        titleStyle={{ color: textColor, fontSize: 14 }}
        onPress={() => {
          setHideCompletedTodos((p) => !p);
          setShowMenu(false);
        }}
      />

      <Divider />

      <Menu.Item
        title="Settings"
        titleStyle={{ color: textColor, fontSize: 14 }}
        onPress={() => {
          setShowMenu(false);
          router.push("/settings" as any);
        }}
      />
    </Menu>
  );
};

export default ToDoMenu;