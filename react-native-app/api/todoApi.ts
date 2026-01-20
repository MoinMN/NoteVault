import api from "@/lib/api";

export const fetchTodosApi = () => api.get("/todo/get");
export const createTodoApi = (text: string) => api.post("/todo/create", { text });
export const updateTodoApi = (id: string, text: string) => api.patch("/todo/update", { id, text });
export const toggleTodoApi = (id: string) => api.patch("/todo/toggle", { id });
export const deleteTodoApi = (ids: string[]) => api.delete("/todo/delete", { data: { ids } });
