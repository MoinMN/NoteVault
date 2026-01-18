import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

type ToDoModalProps = {
  showModal: boolean,
  setShowModal: Dispatch<SetStateAction<boolean>>,
  handleAddNewTodo: (title: string) => void,
  newTodo: string,
  setNewTodo: Dispatch<SetStateAction<string>>,
  setIdToUpdate: Dispatch<SetStateAction<string>>
};

const ToDoModel = ({
  showModal, setShowModal, handleAddNewTodo, newTodo, setNewTodo, setIdToUpdate
}: ToDoModalProps) => {

  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (showModal) {
      timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 500);
    }

    return () => { if (timer) clearTimeout(timer) };
  }, [showModal]);

  return (
    <Modal
      visible={showModal}
      transparent
      animationType="slide"
      onRequestClose={() => setShowModal(false)}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-end"
      >
        {/* Backdrop */}
        <TouchableOpacity
          className="flex-1 bg-black/30"
          activeOpacity={1}
          onPress={() => {
            setShowModal(false);
            setIdToUpdate("");
            setNewTodo("");
          }}
        />

        {/* Bottom Sheet */}
        <View className="w-full bg-[#F3F4F6] dark:bg-[#121314] rounded-t-2xl px-4 pt-4 pb-6">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-6">
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
                setIdToUpdate("");
                setNewTodo("");
              }}
            >
              <Text className="text-red-400 text-base">Cancel</Text>
            </TouchableOpacity>

            <Text className="text-base font-semibold text-black dark:text-white">
              New To-Do
            </Text>

            <TouchableOpacity onPress={() => handleAddNewTodo(newTodo)}>
              <Text className={`${!newTodo.trim() ? "text-gray-500" : "text-[#2563EB]"} text-base`}>
                Save
              </Text>
            </TouchableOpacity>
          </View>

          {/* Input */}
          <TextInput
            ref={inputRef}
            placeholder="Enter your to-do..."
            placeholderTextColor="#9CA3AF"
            value={newTodo}
            onChangeText={setNewTodo}
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-base text-black dark:text-white"
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}

export default ToDoModel
