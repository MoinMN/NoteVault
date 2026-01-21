import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import ErrorCatch from "@/lib/error-catch";
import { useAlert } from "@/context/AlertContext";
import api from "@/lib/api";
import AdminMenu from "./_components/AdminMenu";
import AdminUsersScreen from "./_components/AdminUsersScreen";
import EditHead from "@/components/EditHead";
import ConfirmationModal from "@/components/ui/Modal"; // <--- import

export default function Admin() {
  const { setAlert } = useAlert();

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showConfirm, setShowConfirm] = useState(false); // <--- confirmation state

  const handleBulkDelete = () => {
    handleDeleteUsers(selectedUsers);
    setSelectedUsers([]);
    setEditMode(false);
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((u: any) => u._id));
    }
  };

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/users");

      if (res.data?.success) {
        setUsers(res.data.users);
      }
    } catch (err) {
      ErrorCatch(err, setAlert);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete users
  const handleDeleteUsers = async (ids: string[]) => {
    const prev = users;
    setUsers(prev.filter(u => !ids.includes(u._id))); // optimistic UI

    try {
      await api.delete("/admin/users/delete", {
        data: { ids }
      });
    } catch (err) {
      setUsers(prev); // rollback
      ErrorCatch(err, setAlert);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black px-4">
      <Header
        count={users.length}
        headTitle="Admin"
        subHeadLine="users"
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        MenuComponent={
          <AdminMenu
            editMode={editMode}
            showMenu={showMenu}
            setEditMode={setEditMode}
            setShowMenu={setShowMenu}
            onRefresh={fetchUsers}
          />
        }
      />

      {editMode && (
        <EditHead
          setEditMode={setEditMode}
          selectedItems={selectedUsers}
          setSelectedItems={setSelectedUsers}
          onDelete={() => setShowConfirm(true)} // <--- trigger modal
          onSelectAll={handleSelectAll}
        />
      )}

      {!loading && (
        <AdminUsersScreen
          users={users}
          editMode={editMode}
          handleDeleteUsers={handleDeleteUsers}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          refreshing={loading}
          onRefresh={fetchUsers}
        />
      )}

      {/* Confirmation modal for bulk delete */}
      <ConfirmationModal
        visible={showConfirm}
        setVisible={setShowConfirm}
        title="Delete Selected Users"
        description="Are you sure you want to delete selected users? This action cannot be undone."
        actionText="Delete"
        actionColor="#DC2626"
        onAction={handleBulkDelete}
      />
    </SafeAreaView>
  );
}
