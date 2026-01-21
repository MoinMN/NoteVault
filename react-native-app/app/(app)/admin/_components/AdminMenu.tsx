import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { Menu, Divider } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import ConfirmationModal from "@/components/ui/Modal";
import { useRouter } from "expo-router";

type AdminMenuProps = {
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
  editMode: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  onRefresh: () => void;
  onDeleteSelected?: () => void; // optional bulk delete callback
};

const AdminMenu = ({
  showMenu,
  setShowMenu,
  editMode,
  setEditMode,
  onRefresh,
  onDeleteSelected
}: AdminMenuProps) => {
  const theme = useTheme()?.theme || "light";

  const router = useRouter();
  const [confirmVisible, setConfirmVisible] = useState(false);

  const { textColor, bgColor } = useMemo(
    () => ({
      textColor: theme === "dark" ? "#FFFFFF" : "#121314",
      bgColor: theme === "dark" ? "#121314" : "#FFFFFF",
    }),
    [theme]
  );

  const handleDelete = () => {
    if (onDeleteSelected) {
      onDeleteSelected();
    }
    setConfirmVisible(false);
    setShowMenu(false);
  };

  return (
    <>
      <Menu
        visible={showMenu}
        onDismiss={() => setShowMenu(false)}
        anchor={
          <TouchableOpacity
            onPress={() => setShowMenu(true)}
            style={{ paddingHorizontal: 60, paddingVertical: 6 }}
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
          paddingVertical: 2,
          minWidth: 170,
        }}
      >
        {/* Edit toggle */}
        <Menu.Item
          title={editMode ? "Exit edit mode" : "Edit users"}
          titleStyle={{ color: textColor, fontSize: 14 }}
          onPress={() => {
            setEditMode((p) => !p);
            setShowMenu(false);
          }}
        />

        <Divider />

        {/* Refresh users */}
        <Menu.Item
          title="Refresh users"
          titleStyle={{ color: textColor, fontSize: 14 }}
          onPress={() => {
            onRefresh();
            setShowMenu(false);
          }}
        />

        <Divider />

        {editMode && onDeleteSelected && (
          <>
            <Divider />
            <Menu.Item
              title="Delete selected"
              titleStyle={{ color: "#DC2626", fontSize: 14 }}
              onPress={() => {
                setConfirmVisible(true);
              }}
            />
          </>
        )}

        {/* settings */}
        <Menu.Item
          title="Settings"
          titleStyle={{ color: textColor, fontSize: 14 }}
          onPress={() => {
            setShowMenu(false);
            router.push("/settings" as any);
          }}
        />
      </Menu>

      {/* Confirmation Modal */}
      <ConfirmationModal
        visible={confirmVisible}
        setVisible={setConfirmVisible}
        title="Delete Selected Users"
        description="Are you sure you want to delete selected users? This action cannot be undone."
        actionText="Delete"
        actionColor="#DC2626"
        onAction={handleDelete}
      />
    </>
  );
};

export default AdminMenu;
