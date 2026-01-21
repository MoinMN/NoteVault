import { useLocalSearchParams } from "expo-router";
import NoteForm from "../_components/NoteForm";

export default function EditNote() {
  const params = useLocalSearchParams<{
    id?: string;
    title?: string;
    content?: string;
    createdAt?: string;
    updatedAt?: string;
  }>();

  return (
    <NoteForm
      initialTitle={params.title}
      initialContent={params.content}
      createdAt={params.createdAt}
      updatedAt={params.updatedAt}
      noteId={params.id}
    />
  );
}
