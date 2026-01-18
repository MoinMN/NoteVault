import { SafeAreaView } from "react-native-safe-area-context";
import ToDoScreen from "./_components/ToDoScreen";
import ToDoModel from "./_components/InputModel";
import ToDoMenu from "./_components/Menu";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import ErrorCatch from "@/lib/error-catch";
import { useAlert } from "@/context/AlertContext";

interface Todo {
  _id: string;
  text: string;
  completed: boolean;
}

export default function Todos() {
  const [count, setCount] = useState(0);

  const [todos, setTodos] = useState<Todo[]>([]);

  const [newTodo, setNewTodo] = useState<string>("");
  const [idToUpdate, setIdToUpdate] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [hideCompletedTodos, setHideCompletedTodos] = useState<boolean>(false);
  // alert data
  const { setAlert } = useAlert();

  const toggleTodoStatus = async (id: string) => {
    setTodos(prev =>
      prev.map(item =>
        item._id === id ? { ...item, completed: !item.completed } : item
      )
    );

    try {
      const response = await api.patch("/todo/toggle", { id });
      if (!response.data?.success) throw new Error("Failed to updated!");
    } catch (error) {
      // rollback on error
      setTodos(prev =>
        prev.map(item =>
          item._id === id ? { ...item, completed: !item.completed } : item
        )
      );
      ErrorCatch(error, setAlert);
    }
  };

  const handleAddNewTodo = async (text: string) => {
    if (!text.trim()) return;

    const isUpdate = Boolean(idToUpdate.trim());

    let previousTodos = todos;

    try {
      if (isUpdate) {
        // Optimistic UI update
        setTodos(prev =>
          prev.map(item =>
            item._id === idToUpdate ? { ...item, text } : item
          )
        );

        const response = await api.patch("/todo/update", {
          id: idToUpdate,
          text,
        });

        if (!response.data.success) throw new Error("Update failed");

        // setAlert({ message: "Todo updated", type: "success" });

      } else {
        // Create new todo
        const newItem = {
          _id: Date.now().toString(),
          text,
          completed: false,
        };

        // Optimistic UI
        setTodos(prev => [...prev, newItem]);

        const response = await api.post("/todo/create", { text });

        if (!response.data.success) throw new Error("Create failed");

        // Replace temp id with real id from backend
        const savedTodo = response.data.todo;

        setTodos(prev =>
          prev.map(item => (item._id === newItem._id ? savedTodo : item))
        );

        // setAlert({ message: "Todo added", type: "success" });
      }

      // Reset modal + inputs
      setShowModal(false);
      setNewTodo("");
      setIdToUpdate("");
      setEditMode(false);

    } catch (error) {
      // Rollback UI
      setTodos(previousTodos);
      ErrorCatch(error, setAlert);
    }
  };


  const handleEditModalTrigger = (id: string, text: string) => {
    setNewTodo(text);
    setIdToUpdate(id);
    setShowModal(true);
  }

  const handleDeleteTodos = async (ids: string[]) => {
    // Backup state for rollback
    const previousTodos = todos;

    // Optimistically remove from UI
    setTodos(prev => prev.filter(todo => !ids.includes(todo._id)));

    try {
      const response = await api.delete("/todo/delete", { data: { ids } });

      if (!response.data.success) throw new Error("Delete failed");

      // setAlert({ message: "Todo deleted successfully", type: "success" });
    } catch (error) {
      // Rollback UI if delete fails
      setTodos(previousTodos);
      ErrorCatch(error, setAlert);
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await api.get("/todo/get");
      if (response.data?.success) {
        setTodos(response.data?.todos);
        setCount(response.data?.count);
      }
    } catch (error) {
      // console.log(JSON.stringify(error, null, 2));
      ErrorCatch(error, setAlert);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black px-4">
      {/* Header */}
      <Header
        count={count}
        headTitle="To-dos"
        subHeadLine="tasks"
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        MenuComponent={
          <ToDoMenu
            showMenu={showMenu}
            editMode={editMode}
            setShowMenu={setShowMenu}
            setEditMode={setEditMode}
            hideCompletedTodos={hideCompletedTodos}
            setHideCompletedTodos={setHideCompletedTodos}
          />
        }
      />

      {/* main screen of todo */}
      <ToDoScreen
        todos={todos}
        toggleTodoStatus={toggleTodoStatus}
        handleEditModalTrigger={handleEditModalTrigger}
        handleDeleteTodos={handleDeleteTodos}
        editMode={editMode}
        setEditMode={setEditMode}
        setShowModal={setShowModal}
        hideCompletedTodos={hideCompletedTodos}
      />

      {/* confirmation modal */}
      {showModal && (
        <ToDoModel
          showModal={showModal}
          setShowModal={setShowModal}
          handleAddNewTodo={handleAddNewTodo}
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          setIdToUpdate={setIdToUpdate}
        />
      )}
    </SafeAreaView>
  );
}
