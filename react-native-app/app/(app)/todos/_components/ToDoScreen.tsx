import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Dispatch, SetStateAction, useState } from "react";
import ConfirmationModal from "@/components/ui/Modal";
import EditHead from "@/components/EditHead";
import SelectableItem from "./SelectedItem";
import { useTheme } from "@/context/ThemeContext";

type Todo = {
  _id: string,
  text: string,
  completed: boolean
}

type ToDoScreenProps = {
  todos: Todo[],
  toggleTodoStatus: (id: string) => void,
  handleEditModalTrigger: (id: string, text: string) => void,
  handleDeleteTodos: (ids: string[]) => void,
  editMode: boolean,
  setEditMode: Dispatch<SetStateAction<boolean>>,
  setShowModal: Dispatch<SetStateAction<boolean>>,
  hideCompletedTodos: boolean,
}

const ToDoScreen = (
  {
    todos,
    toggleTodoStatus,
    handleEditModalTrigger,
    handleDeleteTodos,
    editMode,
    setEditMode,
    hideCompletedTodos,
    setShowModal
  }: ToDoScreenProps
) => {
  const { theme } = useTheme() as any;

  const [selectedTodos, setSelectedTodos] = useState<string[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);

  const selectAll = () => {
    if (selectedTodos.length === todos.length) {
      setSelectedTodos([]);
    } else {
      setSelectedTodos(todos.map((t) => t._id));
    }
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: editMode ? 90 : 80, }}
      >
        {editMode && (
          <EditHead
            setEditMode={setEditMode}
            selectedItems={selectedTodos}
            setSelectedItems={setSelectedTodos}
            onDelete={() => setShowConfirm(true)}
            onSelectAll={selectAll}
          />
        )}

        {/* Pending Todos */}
        {todos?.filter(item => !item.completed).map(item => (
          <SelectableItem
            key={item._id}
            id={item._id}
            title={item.text}
            editMode={editMode}
            selectedItems={selectedTodos}
            setEditMode={setEditMode}
            setSelectedItems={setSelectedTodos}
            toggleTodoStatus={toggleTodoStatus}
            onPressItem={() => handleEditModalTrigger(item._id, item.text)}
          />
        ))}

        {/* Completed Todos */}
        {todos?.some(item => item.completed) && !hideCompletedTodos && (
          <View className="mt-6">
            <Text className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Completed
            </Text>
            {todos?.filter(item => item.completed).map(item => (
              <SelectableItem
                key={item._id}
                id={item._id}
                title={item.text}
                completed
                editMode={editMode}
                selectedItems={selectedTodos}
                setEditMode={setEditMode}
                setSelectedItems={setSelectedTodos}
                toggleTodoStatus={toggleTodoStatus}
                onPressItem={() => handleEditModalTrigger(item._id, item.text)}
              />
            ))}
          </View>
        )}
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity
        onPress={() => setShowModal(true)}
        className="absolute bottom-4 right-6 bg-[#2563EB] w-14 h-14 rounded-full items-center justify-center shadow-lg"
      >
        <MaterialCommunityIcons
          name="plus"
          size={28}
          color={theme === "dark" ? "#c3ccdb" : "#ffffff"}
        />
      </TouchableOpacity>

      <ConfirmationModal
        visible={showConfirm}
        setVisible={setShowConfirm}
        title="Delete selected todos?"
        description="This action cannot be undone."
        actionText="Delete"
        actionColor="#DC2626"
        onAction={() => {
          handleDeleteTodos(selectedTodos)
          setSelectedTodos([]);
          setEditMode(false);
        }}
      />
    </>
  );
}

export default ToDoScreen