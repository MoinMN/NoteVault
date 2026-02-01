import { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, Share, TextInput, BackHandler } from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NoteEditor from "./NoteEditor";
import ErrorCatch from "@/lib/error-catch";
import { useAlert } from "@/context/AlertContext";
import { useAppDispatch } from "@/hooks/redux";
import { addLocal, replaceTempId, saveNote, updateLocal } from "@/redux/slices/note.slice";
import { Searchbar } from "react-native-paper";
import { useTheme } from "@/context/ThemeContext";

type NoteFormProps = {
  initialTitle?: string;
  initialContent?: string;
  noteId?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

export default function NoteForm({
  initialTitle = "",
  initialContent = "",
  noteId,
  createdAt,
  updatedAt
}: NoteFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const dispatch = useAppDispatch();
  const theme = useTheme()?.theme;
  const { setAlert } = useAlert();

  // Refs for tracking state
  const saveTimeout = useRef<NodeJS.Timeout | number | null>(null);
  const isSavingRef = useRef(false); // Prevent concurrent saves
  const currentNoteIdRef = useRef(noteId); // Track current note ID
  const lastSavedDataRef = useRef({ title: initialTitle, content: initialContent });

  // Search state
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<TextInput>(null);

  // Update current note ID ref when noteId changes
  useEffect(() => {
    currentNoteIdRef.current = noteId;
  }, [noteId]);

  // Focus search input when visible
  useEffect(() => {
    if (searchVisible) {
      const timer = setTimeout(() => {
        searchRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [searchVisible]);

  // Update state when props change
  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
    lastSavedDataRef.current = { title: initialTitle, content: initialContent };
  }, [initialTitle, initialContent]);

  const hasChanges = () => {
    return (
      title !== lastSavedDataRef.current.title ||
      content !== lastSavedDataRef.current.content
    );
  };

  const autoSaveNote = async (force = false) => {
    // Prevent concurrent saves
    if (isSavingRef.current) {
      return;
    }

    // Check if there's anything to save
    if (!title.trim() && !content.trim()) {
      return;
    }

    // Skip if no changes (unless forced)
    if (!force && !hasChanges()) {
      return;
    }

    isSavingRef.current = true;

    try {
      const dataToSave = { title, content };
      lastSavedDataRef.current = dataToSave;

      if (currentNoteIdRef.current) {
        // Update existing note
        dispatch(updateLocal({
          id: currentNoteIdRef.current,
          title: dataToSave.title,
          content: dataToSave.content
        }));

        await dispatch(saveNote({
          id: currentNoteIdRef.current,
          title: dataToSave.title,
          content: dataToSave.content
        })).unwrap();
      } else {
        // Create new note (only once)
        const tempId = `temp_${Date.now()}`;

        // Add optimistic local entry
        dispatch(addLocal({
          _id: tempId,
          title: dataToSave.title,
          content: dataToSave.content,
          createdAt: Date.now(),
          updatedAt: Date.now()
        }));

        // Save to backend
        const realNote = await dispatch(saveNote({
          title: dataToSave.title,
          content: dataToSave.content
        })).unwrap();

        // Replace temp ID with real ID
        dispatch(replaceTempId({ tempId, realNote }));

        // Update the current note ID ref to prevent duplicate saves
        currentNoteIdRef.current = realNote._id;
      }
    } catch (err) {
      ErrorCatch(err, setAlert);
    } finally {
      isSavingRef.current = false;
    }
  };

  const handleBack = async () => {
    // Clear any pending auto-save
    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
      saveTimeout.current = null;
    }

    // Save if there are changes
    if (hasChanges() && (title.trim() || content.trim())) {
      await autoSaveNote(true);
    }

    router.replace("/(app)/notes");
  };

  const handleShare = async () => {
    if (!title.trim() || !content.trim()) {
      return setAlert({ message: "Please write a title or content first.", type: "warning" });
    }

    try {
      const messageParts = [];
      if (title.trim()) messageParts.push(`Title: ${title}`);
      if (content.trim()) messageParts.push(`Content: ${content}`);
      const message = messageParts.join("\n\n");

      await Share.share({ title: title || "My Note", message });
    } catch {
      setAlert({ message: "Could not share the note. Try again.", type: "error" });
    }
  };

  // Auto-save effect
  useEffect(() => {
    // Clear existing timeout
    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
    }

    // Set new timeout for auto-save
    saveTimeout.current = setTimeout(() => {
      autoSaveNote();
    }, 1500);

    // Cleanup
    return () => {
      if (saveTimeout.current) {
        clearTimeout(saveTimeout.current);
      }
    };
  }, [title, content]);

  // Handle hardware back button
  useEffect(() => {
    const onBackPress = () => {
      handleBack();
      return true;
    };

    const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);

    return () => subscription.remove();
  }, [title, content]); // Include deps so handleBack has latest values

  return (
    <>
      <View className="flex-1 bg-white dark:bg-black">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
          {/* Back */}
          <TouchableOpacity
            onPress={handleBack}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            className="p-2"
          >
            <MaterialCommunityIcons name="arrow-left" size={26} color="#2563EB" />
          </TouchableOpacity>

          {/* Right actions */}
          <View className="flex-row items-center gap-5">
            {/* SEARCH */}
            <TouchableOpacity onPress={() => setSearchVisible((prev) => !prev)}>
              <MaterialCommunityIcons name="magnify" size={24} color="#2563EB" />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleShare}>
              <MaterialCommunityIcons name="share-variant" size={22} color="#2563EB" />
            </TouchableOpacity>
          </View>
        </View>

        {/* SEARCH BAR */}
        {searchVisible && (
          <View className="p-2 border-b border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-[#1C1C1E]">
            <Searchbar
              ref={searchRef as any}
              placeholder="Search content..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              elevation={0}
              style={{
                backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
                borderRadius: 8,
              }}
              inputStyle={{
                color: theme === "dark" ? "#FFFFFF" : "#000000",
              }}
              placeholderTextColor="#999"
              iconColor={theme === "dark" ? "#FFFFFF" : "#000000"}
            />
          </View>
        )}

        {/* Editor */}
        <NoteEditor
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          autoFocus={true}
          searchQuery={searchQuery}
          createdAt={createdAt}
          updatedAt={updatedAt}
        />
      </View>
    </>
  );
}