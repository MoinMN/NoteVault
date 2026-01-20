import { SafeAreaView } from "react-native-safe-area-context";
import NotesScreen from "./_components/NotesScreen";
import { useEffect, useState } from "react";
import NotesMenu from "./_components/Menu";
import Header from "@/components/Header";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useAlert } from "@/context/AlertContext";
import { fetchNotes } from "@/redux/slices/note.slice";
import ErrorCatch from "@/lib/error-catch";

export default function Todos() {
  const dispatch = useAppDispatch();
  const { setAlert } = useAlert();

  const { notes, loading } = useAppSelector(state => state.notes);

  const [showMenu, setShowMenu] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [gridView, setGridView] = useState(false);
  const [sortBy, setSortBy] = useState<"created" | "edited">("edited");

  useEffect(() => {
    dispatch(fetchNotes())
      .unwrap()
      .catch(err => ErrorCatch(err, setAlert));
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black px-4">
      {/* header  */}
      <Header
        headTitle="Notes"
        subHeadLine="notes"
        count={notes.length}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        MenuComponent={
          <NotesMenu
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            editMode={editMode}
            setEditMode={setEditMode}
            gridView={gridView}
            setGridView={setGridView}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        }
      />

      <NotesScreen
        notes={notes}
        loading={loading}
        editMode={editMode}
        setEditMode={setEditMode}
        gridView={gridView}
        sortBy={sortBy}
      />

    </SafeAreaView>
  );
}
