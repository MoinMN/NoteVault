import api from "@/lib/api";
import { decryptData, encryptData } from "@/lib/encryption";

export const fetchNotesApi = async () => {
  const res = await api.get("/note/get");

  const notes = await Promise.all(
    res.data.notes.map(async (note: any) => ({
      ...note,
      title: await decryptData(note.title),
      content: await decryptData(note.content),
    }))
  );

  return notes;
};

export const saveNoteApi = async (payload: {
  id?: string;
  title: string;
  content: string;
}) => {
  const encryptedPayload = {
    ...payload,
    title: await encryptData(payload.title),
    content: await encryptData(payload.content),
  };

  const res = payload.id
    ? await api.put("/note/update", encryptedPayload)
    : await api.post("/note/create", encryptedPayload);

  // Decrypt the returned note before returning
  const note = res.data.note;
  if (note) {
    note.title = await decryptData(note.title);
    note.content = await decryptData(note.content);
  }
  return note;
};

export const deleteNotesApi = async (ids: string[]) =>
  api.delete("/note/delete", { data: { ids } });

export const countNotesApi = async () => api.get("/note/count");
