import { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, Text, Share, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NoteEditor from "./NoteEditor";
import ErrorCatch from "@/lib/error-catch";
import api from "@/lib/api";
import { useAlert } from "@/context/AlertContext";

type NoteFormProps = {
  initialTitle?: string;
  initialContent?: string;
  noteId?: string; // optional for edit
  apiEndpoint: string; // e.g. "/note/create" or "/note/update"
  redirectTo?: string; // default redirect after save
  buttonText?: string; // e.g. "Save" or "Update"
};

export default function NoteForm({
  initialTitle = "",
  initialContent = "",
  noteId,
  apiEndpoint,
  redirectTo = "/(app)/notes",
  buttonText = "Save",
}: NoteFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const { setAlert } = useAlert();

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

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      setAlert({ message: "Title & Content Needed!", type: "warning" });
      return;
    }

    try {
      const payload: any = { title, content };
      if (noteId) payload.id = noteId;

      const response = await (noteId ? api.put(apiEndpoint, payload) : api.post(apiEndpoint, payload));
      if (!response.data?.success) {
        return setAlert({ message: response.data?.msg, type: "warning" });
      }

      router.push(redirectTo as any);
    } catch (error) {
      ErrorCatch(error, setAlert);
    }
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

      const result = await Share.share({ title: title || "My Note", message });
      if (result.action === Share.dismissedAction) console.log("Share cancelled");
    } catch {
      setAlert({ message: "Could not share the note. Try again.", type: "error" });
    }
  };

  return (
    <>
      <View className="flex-1 bg-white dark:bg-black">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
          {/* Back */}
          <TouchableOpacity onPress={() => router.push(redirectTo as any)}>
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

            <TouchableOpacity onPress={handleSave}>
              <Text className="text-blue-500 font-semibold text-base">{buttonText}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* SEARCH BAR */}
        {searchVisible && (
          <View className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-[#1C1C1E]">
            <TextInput
              placeholder="Search content..."
              placeholderTextColor="#999"
              value={searchQuery}
              ref={searchRef}
              onChangeText={setSearchQuery}
              className="bg-white dark:bg-black rounded-md px-3 py-2 text-black dark:text-white"
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
        />
      </View>
    </>
  );
}
