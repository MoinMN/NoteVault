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
  noteId?: string; // optional for edit
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

  const titleRef = useRef(title);
  const contentRef = useRef(content);

  useEffect(() => {
    titleRef.current = title;
    contentRef.current = content;
    isDirtyRef.current = true;
  }, [title, content]);

  const dispatch = useAppDispatch();
  const theme = useTheme()?.theme;
  const { setAlert } = useAlert();

  const isDirtyRef = useRef(false);
  const saveTimeout = useRef<number | null>(null);

  const lastSaved = useRef({ title: initialTitle, content: initialContent });

  // --- SEARCH STATE ---
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<TextInput>(null);

  // Focus the search input when search bar becomes visible
  useEffect(() => {
    if (searchVisible) {
      const timer = setTimeout(() => {
        searchRef.current?.focus();
      }, 100); // slight delay to let the UI render
      return () => clearTimeout(timer);
    }
  }, [searchVisible]);

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  const handleBack = async () => {
    if (saveTimeout.current) clearTimeout(saveTimeout.current);

    if (isDirtyRef.current) {
      await autoSaveNote(true);
    }

    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(app)/notes"); // fallback route
    }
  };

  useEffect(() => {
    const onBackPress = () => {
      if (isDirtyRef.current) {
        // Prevent default back
        try {
          autoSaveNote(true);
        } catch (err) {
          console.log("Error saving on back:", err);
        }
      }

      // Now go back
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace("/(app)/notes"); // fallback route
      }
      return true; // indicate we handled the back
    };

    const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
      onBackPress();
      return true; // important: prevent default until we call router.back()
    });

    return () => subscription.remove();
  }, []);

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

  const autoSaveNote = async (force = false) => {
    const t = titleRef.current;
    const c = contentRef.current;

    if (!isDirtyRef.current) return;
    if (!t.trim() || !c.trim()) return;

    if (!force &&
      t === lastSaved.current.title &&
      c === lastSaved.current.content
    ) return;

    lastSaved.current = { title: t, content: c };

    if (noteId) {
      // Optimistic UI update
      dispatch(updateLocal({ id: noteId, title: t, content: c }));
      // router.push("/(app)/notes");

      try {
        await dispatch(saveNote({ id: noteId, title: t, content: c })).unwrap();
      } catch (err) {
        ErrorCatch(err, setAlert);
      }
      isDirtyRef.current = false;
      return;
    }

    // if creating new
    const tempId = Date.now().toString();

    // Optimistic UI add
    dispatch(addLocal({
      _id: tempId,
      title: t,
      content: c,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }));

    // router.push("/(app)/notes");

    try {
      const realNote = await dispatch(saveNote({ title: t, content: c })).unwrap();

      dispatch(replaceTempId({ tempId, realNote }));
    } catch (err) {
      ErrorCatch(err, setAlert);
    } finally {
      isDirtyRef.current = false;
    }
  };

  useEffect(() => {
    isDirtyRef.current = true;

    if (saveTimeout.current) clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(() => {
      autoSaveNote();
    }, 1500);

    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, [title, content]);

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
