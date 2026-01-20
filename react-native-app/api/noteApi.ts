import api from "@/lib/api";

export const fetchNotesApi = async () => api.get("/note/get");

export const saveNoteApi = async (payload: {
  id?: string;
  title: string;
  content: string;
}) => {
  return payload.id
    ? api.put("/note/update", payload)
    : api.post("/note/create", payload);
};

export const deleteNotesApi = async (ids: string[]) =>
  api.delete("/note/delete", { data: { ids } });

export const countNotesApi = async () => api.get("/note/count");
