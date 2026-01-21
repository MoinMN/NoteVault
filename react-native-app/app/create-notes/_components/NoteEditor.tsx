import { useRef, useEffect, useMemo } from "react";
import {
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type NoteEditorProps = {
  title: string;
  setTitle: (text: string) => void;
  content: string;
  setContent: (text: string) => void;
  autoFocus?: boolean;
  searchQuery?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

const NoteEditor = ({
  title,
  setTitle,
  content,
  setContent,
  autoFocus = true,
  searchQuery = "",
  createdAt,
  updatedAt,
}: NoteEditorProps) => {
  const contentRef = useRef<TextInput>(null);
  const titleRef = useRef<TextInput>(null);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (autoFocus) {
      const timer = setTimeout(() => {
        titleRef.current?.focus();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [autoFocus]);

  const formatDate = (date?: string | Date) => {
    if (!date) return "";
    return new Date(date).toLocaleString();
  };

  // --- HIGHLIGHTED CONTENT ---
  const contentParts = useMemo(() => {
    if (!searchQuery.trim()) return [{ text: content, highlight: false }];

    const escaped = searchQuery.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const regex = new RegExp(`(${escaped})`, "gi");

    const parts: { text: string; highlight: boolean }[] = [];
    let lastIndex = 0;

    content.replace(regex, (match, _, offset) => {
      if (offset > lastIndex) {
        parts.push({ text: content.slice(lastIndex, offset), highlight: false });
      }
      parts.push({ text: match, highlight: true });
      lastIndex = offset + match.length;
      return match;
    });

    if (lastIndex < content.length) {
      parts.push({ text: content.slice(lastIndex), highlight: false });
    }

    return parts;
  }, [content, searchQuery]);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black" edges={["bottom"]}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={90}
      >
        <ScrollView
          className="flex-1"
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 500 }}
        >
          <View className="px-4 pt-4 flex-1">
            {/* META INFO */}
            {(createdAt || updatedAt) && (
              <View className="mb-3">
                {createdAt && (
                  <Text className="text-xs text-gray-500 dark:text-gray-400">
                    Created: {formatDate(createdAt)}
                  </Text>
                )}
                {updatedAt && (
                  <Text className="text-xs text-gray-500 dark:text-gray-400">
                    Updated: {formatDate(updatedAt)}
                  </Text>
                )}
              </View>
            )}

            {/* Title */}
            <TextInput
              ref={titleRef}
              value={title}
              onChangeText={setTitle}
              placeholder="Title"
              placeholderTextColor="#999"
              className="text-2xl font-bold text-black dark:text-white mb-6"
              autoFocus={autoFocus}
              returnKeyType="next"
              onSubmitEditing={() => contentRef.current?.focus()}
            />

            {/* Content */}
            {searchQuery.trim() ? (
              <ScrollView ref={scrollRef} className="min-h-[500px]">
                <Text className="text-base leading-6 text-black dark:text-white">
                  {contentParts.map((part, idx) => (
                    <Text
                      key={idx}
                      className={
                        part.highlight
                          ? "bg-yellow-300 dark:bg-yellow-600"
                          : ""
                      }
                    >
                      {part.text}
                    </Text>
                  ))}
                </Text>
              </ScrollView>
            ) : (
              <TextInput
                ref={contentRef}
                value={content}
                onChangeText={setContent}
                placeholder="Write your note..."
                placeholderTextColor="#999"
                multiline
                textAlignVertical="top"
                className="text-base text-black dark:text-white min-h-[500px] leading-6"
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NoteEditor;
