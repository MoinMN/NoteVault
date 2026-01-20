import { useRouter } from "expo-router";
import { Dispatch, SetStateAction, useMemo } from "react";
import { TouchableOpacity, Text } from "react-native";
import { Divider, Menu } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";

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
  const theme = useTheme()?.theme || "light";

  const { textColor, bgColor } = useMemo(
    () => ({
      textColor: theme === "dark" ? "#FFFFFF" : "#121314",
      bgColor: theme === "dark" ? "#121314" : "#FFFFFF",
    }),
    [theme]
  );

  const MenuItemWithCheck = ({ title, checked, onPress, }: {
    title: string;
    checked: boolean;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 16,
      }}
    >
      <Text style={{ color: textColor, fontSize: 14 }}>{title}</Text>
      {checked && (
        <MaterialCommunityIcons name="check" size={16} color="#22C55E" />
      )}
    </TouchableOpacity>
  );

  return (
    <Menu
      visible={showMenu}
      onDismiss={() => setShowMenu(false)}
      anchor={
        <TouchableOpacity
          onPress={() => setShowMenu(true)}
          style={{
            paddingHorizontal: 70,
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
        minWidth: 190
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
        title={gridView ? "List view" : "Grid view"}
        titleStyle={{ color: textColor, fontSize: 14 }}
        onPress={() => {
          setGridView((p) => !p);
          setShowMenu(false);
        }}
      />

      <Divider />

      <MenuItemWithCheck
        title="Sort by time created"
        checked={sortBy === "created"}
        onPress={() => {
          setSortBy("created");
          setShowMenu(false);
        }}
      />

      <MenuItemWithCheck
        title="Sort by time edited"
        checked={sortBy === "edited"}
        onPress={() => {
          setSortBy("edited");
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

export default NotesMenu;