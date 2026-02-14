import { decryptData, encryptData } from "@/lib/encryption";
import api from "@/lib/api";

export const fetchTodosApi = async () => {
  const res = await api.get("/todo/get");

  const todos = await Promise.all(
    res.data.todos.map(async (todo: any) => ({
      ...todo,
      text: await decryptData(todo.text),
    }))
  );
  return todos;
};

export const createTodoApi = async (text: string) => {
  const encryptedText = await encryptData(text);
  const res = await api.post("/todo/create", { text: encryptedText });

  // Decrypt the returned todo before returning
  const todo = res.data.todo;
  todo.text = await decryptData(todo.text);
  return todo;
};

export const updateTodoApi = async (id: string, text: string) => {
  const encryptedText = await encryptData(text);
  const res = await api.patch("/todo/update", { id, text: encryptedText });

  const todo = res.data.todo;
  todo.text = await decryptData(todo.text);
  return todo;
};

export const toggleTodoApi = async (id: string) => {
  const res = await api.patch("/todo/toggle", { id });
  const todo = res.data.todo;
  todo.text = await decryptData(todo.text);
  return todo;
};

export const deleteTodoApi = (ids: string[]) => api.delete("/todo/delete", { data: { ids } });
