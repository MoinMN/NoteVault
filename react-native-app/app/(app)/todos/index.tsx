import { SafeAreaView } from "react-native-safe-area-context";
import ToDoScreen from "./_components/ToDoScreen";
import ToDoModel from "./_components/InputModel";
import ToDoMenu from "./_components/Menu";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import ErrorCatch from "@/lib/error-catch";
import { useAlert } from "@/context/AlertContext";
import Loader from "@/components/ui/Loader";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  fetchTodos,
  addLocal,
  createTodo,
  deleteLocal,
  deleteTodo,
  toggleLocal,
  toggleTodo,
  updateLocal,
  updateTodo,
  replaceTempId
} from "@/redux/slices/todo.slice";

export default function Todos() {
  const dispatch = useAppDispatch();

  const { setAlert } = useAlert();
  const { todos, loading } = useAppSelector(state => state.todos);

  const [newTodo, setNewTodo] = useState<string>("");
  const [idToUpdate, setIdToUpdate] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [hideCompletedTodos, setHideCompletedTodos] = useState<boolean>(false);

  const handleEditModalTrigger = (id: string, text: string) => {
    setNewTodo(text);
    setIdToUpdate(id);
    setShowModal(true);
  }

  const handleAddTodo = async (text: string) => {
    const temp = { _id: Date.now().toString(), text, completed: false };

    // Optimistic UI
    dispatch(addLocal(temp));
    setShowModal(false);
    setNewTodo("");
    setIdToUpdate("");
    setEditMode(false);

    try {
      const result = await dispatch(createTodo(text)).unwrap();
      dispatch(replaceTempId({ tempId: temp._id, realTodo: result }));
    } catch (err: unknown) {
      dispatch(deleteLocal([temp._id]));
      ErrorCatch(err as any, setAlert);
    }
  };

  const handleToggle = (id: string) => {
    dispatch(toggleLocal(id));
    dispatch(toggleTodo(id))
      .unwrap()
      .catch(err => ErrorCatch(err, setAlert));
  };

  const handleUpdate = (text: string) => {
    if (!idToUpdate.trim()) return;

    // Optimistic UI
    dispatch(updateLocal({ id: idToUpdate, text }));
    setShowModal(false);
    setNewTodo("");
    setIdToUpdate("");
    setEditMode(false);

    // Call backend
    dispatch(updateTodo({ id: idToUpdate, text }))
      .unwrap()
      .catch(err => ErrorCatch(err, setAlert));
  };

  const handleDelete = (ids: string[]) => {
    dispatch(deleteLocal(ids));
    dispatch(deleteTodo(ids))
      .unwrap()
      .catch(err => ErrorCatch(err, setAlert));
  };

  // fetch todos
  useEffect(() => {
    dispatch(fetchTodos())
      .unwrap()
      .catch(err => ErrorCatch(err, setAlert));
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black px-4">
      {/* Header */}
      <Header
        count={todos.length}
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

      {(loading && todos.length === 0) && <Loader />}

      {/* main screen of todo */}
      <ToDoScreen
        todos={todos}
        toggleTodoStatus={handleToggle}
        handleEditModalTrigger={handleEditModalTrigger}
        handleDeleteTodos={handleDelete}
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
          handleAddNewTodo={idToUpdate ? handleUpdate : handleAddTodo}
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          setIdToUpdate={setIdToUpdate}
        />
      )}
    </SafeAreaView>
  );
}
