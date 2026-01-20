import Checkbox from "@/components/ui/CheckBox";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import * as Haptics from "expo-haptics";
import EditHead from "@/components/EditHead";
import { useRouter } from "expo-router";
import ConfirmationModal from "@/components/ui/Modal";
import ErrorCatch from "@/lib/error-catch";
import { useAlert } from "@/context/AlertContext";
import { useTheme } from "@/context/ThemeContext";
import { useAppDispatch } from "@/hooks/redux";
import { deleteLocal, deleteNotes, fetchNotes } from "@/redux/slices/note.slice";

type Note = {
  _id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
};

type SortBy = "created" | "edited";

type NotesScreenProps = {
  notes: Note[];
  loading: boolean;
  gridView: boolean;
  sortBy: SortBy;
  editMode: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
};

const NotesScreen = ({
  notes, loading, gridView, sortBy, editMode, setEditMode
}: NotesScreenProps) => {
  const router = useRouter();

  const { theme } = useTheme() as any;

  const dispatch = useAppDispatch();
  const { setAlert } = useAlert();

  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);

  const [showConfirm, setShowConfirm] = useState(false);
  const [refreshing] = useState(false);

  const toggleSelectTodo = (id: string) => {
    if (selectedNotes.includes(id)) {
      setSelectedNotes(selectedNotes.filter((tid) => tid !== id));
    } else {
      setSelectedNotes([...selectedNotes, id]);
    }
  };

  const selectAll = () => {
    if (selectedNotes.length === notes.length) {
      setSelectedNotes([]);
    } else {
      setSelectedNotes(notes.map((t) => t._id));
    }
  };

  const sortedNotes = useMemo(() => {
    return [...notes].sort((a, b) =>
      sortBy === "created"
        ? b.createdAt - a.createdAt
        : b.updatedAt - a.updatedAt
    );
  }, [notes, sortBy]);

  const handleDeleteNotes = (ids: string[]) => {
    dispatch(deleteLocal(ids)); // instant UI remove

    dispatch(deleteNotes(ids))
      .unwrap()
      .catch(err => ErrorCatch(err, setAlert));

    setSelectedNotes([]);
    setEditMode(false);
  };

  return (
    <>
      <View className="flex-1 bg-white dark:bg-black px-2 pt-4">
        {editMode && (
          <EditHead
            setEditMode={setEditMode}
            selectedItems={selectedNotes}
            setSelectedItems={setSelectedNotes}
            onDelete={() => setShowConfirm(true)}
            onSelectAll={selectAll}
          />
        )}

        <FlatList
          contentContainerStyle={{ paddingBottom: editMode ? 90 : 80, }}
          data={sortedNotes}
          keyExtractor={(item) => item._id}
          key={gridView ? "grid" : "list"}
          numColumns={gridView ? 2 : 1}
          refreshing={refreshing}
          onRefresh={fetchNotes}
          columnWrapperStyle={
            gridView ? { justifyContent: "space-between" } : undefined
          }
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            const isFirst = index === 0;
            const isLast = index === sortedNotes.length - 1;
            const isSelected = selectedNotes.includes(item._id);

            const radiusClass = gridView
              ? "rounded-xl"
              : `${isFirst ? "rounded-t-xl" : ""} ${isLast ? "rounded-b-xl" : ""}`;

            const cardPadding = gridView ? "p-4 mb-4" : "px-4 py-3";

            return (
              <>
                <TouchableOpacity
                  activeOpacity={0.8}
                  delayLongPress={300}
                  onLongPress={() => {
                    if (!editMode) {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                      setEditMode(true);
                      setSelectedNotes([item._id]);
                    }
                  }}
                  onPress={() => {
                    if (editMode) {
                      toggleSelectTodo(item._id);
                    } else {
                      router.push({
                        pathname: "/create-notes/[id]" as any,
                        params: {
                          id: item._id,
                          title: item.title,
                          content: item.content,
                        },
                      });
                    }
                  }}
                  className={`
                    bg-gray-100 dark:bg-[#121314]
                    ${radiusClass}
                    ${cardPadding}
                    ${gridView ? "w-[48%]" : "w-full"}
                    ${isSelected ? "border border-blue-500" : ""}
                  `}
                >
                  {/* Checkbox (edit mode only) */}
                  {editMode && (
                    <View className="absolute top-3 right-3 z-10">
                      <Checkbox checked={isSelected} />
                    </View>
                  )}

                  {/* Title */}
                  <Text
                    className="text-base font-semibold text-black dark:text-white"
                    numberOfLines={1}
                  >
                    {item.title.trim()}
                  </Text>

                  {/* Date */}
                  <Text className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {sortBy === "edited"
                      ? `Edited ${new Date(item.updatedAt).toLocaleDateString()}`
                      : `Created ${new Date(item.createdAt).toLocaleDateString()}`}
                  </Text>

                  {/* Content */}
                  <Text
                    className="text-sm text-gray-700 dark:text-gray-300 mt-1"
                    numberOfLines={gridView ? 3 : 1}
                    ellipsizeMode="tail"
                  >
                    {item.content.trim()}
                  </Text>
                </TouchableOpacity>

                {/* Divider for list */}
                {!gridView && !isLast && (
                  <View className="h-px bg-gray-200 dark:bg-gray-800" />
                )}
              </>
            );
          }}
        />
      </View>

      {/* Floating Add Button */}
      <TouchableOpacity
        onPress={() => router.replace("/create-notes/" as any)}
        className="absolute bottom-4 right-6 bg-[#2563EB] w-14 h-14 rounded-full items-center justify-center shadow-lg"
      >
        <MaterialCommunityIcons
          name="plus"
          size={28}
          color={theme === "dark" ? "#c3ccdb" : "#ffffff"}
        />
      </TouchableOpacity>

      <ConfirmationModal
        visible={showConfirm}
        setVisible={setShowConfirm}
        title="Delete selected todos?"
        description="This action cannot be undone."
        actionText="Delete"
        actionColor="#DC2626"
        onAction={() => {
          handleDeleteNotes(selectedNotes)
          setSelectedNotes([]);
          setEditMode(false);
        }}
      />
    </>
  );
};

export default NotesScreen;
