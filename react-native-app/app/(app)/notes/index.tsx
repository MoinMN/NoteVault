import { SafeAreaView } from "react-native-safe-area-context";
import NotesScreen from "./_components/NotesScreen";
import { useEffect, useState } from "react";
import NotesMenu from "./_components/Menu";
import Header from "@/components/Header";
import api from "@/lib/api";

export default function Todos() {
  const [count, setCount] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [gridView, setGridView] = useState(false);
  const [sortBy, setSortBy] = useState<"created" | "edited">("edited");

  useEffect(() => {
    const fetchNotesCount = async () => {
      try {
        const response = await api.get("/note/count");
        if (response.data?.success) {
          setCount(response.data?.count);
        } else {
          setCount(0);
        }
      } catch (error) {
        console.log(JSON.stringify(error, null, 2));
      }
    };

    fetchNotesCount();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black px-4">
      {/* header  */}
      <Header
        headTitle="Notes"
        subHeadLine="notes"
        count={count}
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
        editMode={editMode}
        setEditMode={setEditMode}
        gridView={gridView}
        sortBy={sortBy}
      />

    </SafeAreaView>
  );
}
