import { useLocalSearchParams } from "expo-router";
import NoteForm from "../_components/NoteForm";

export default function EditNote() {
  const params = useLocalSearchParams<{ id?: string; title?: string; content?: string }>();

  return (
    <NoteForm
      initialTitle={params.title}
      initialContent={params.content}
      noteId={params.id}
      apiEndpoint="/note/update"
      buttonText="Update"
    />
  );
}
