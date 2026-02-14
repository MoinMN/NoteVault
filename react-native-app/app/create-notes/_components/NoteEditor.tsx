import { useRef, useEffect, useMemo, useState } from "react";
import {
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  Keyboard,
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
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    if (autoFocus) {
      const timer = setTimeout(() => {
        titleRef.current?.focus();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [autoFocus]);

  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardVisible(true);
    });
    const keyboardDidHide = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, []);

  const formatDate = (date?: string | Date) => {
    if (!date) return "";
    return new Date(date).toLocaleString();
  };

  // Handle bullet insertion
  const insertBullet = () => {
    const { start } = selection;
    let lineStart = content.lastIndexOf("\n", start - 1) + 1;

    const newText =
      content.substring(0, lineStart) +
      "• " +
      content.substring(lineStart);

    setContent(newText);

    // Use requestAnimationFrame instead of setTimeout for better timing
    requestAnimationFrame(() => {
      contentRef.current?.focus();
      const newPosition = start + 2;
      contentRef.current?.setNativeProps({
        selection: { start: newPosition, end: newPosition },
      });
    });
  };

  // Handle numbered list insertion
  const insertNumberedList = () => {
    const { start } = selection;
    let lineStart = content.lastIndexOf("\n", start - 1) + 1;
    const linesBefore = content.substring(0, lineStart).split("\n");
    const prevLine = linesBefore[linesBefore.length - 2] || "";
    const numberMatch = prevLine.match(/^(\d+)\.\s/);
    const nextNumber = numberMatch ? parseInt(numberMatch[1]) + 1 : 1;

    const newText =
      content.substring(0, lineStart) +
      `${nextNumber}. ` +
      content.substring(lineStart);

    setContent(newText);

    requestAnimationFrame(() => {
      contentRef.current?.focus();
      const newPosition = start + `${nextNumber}. `.length;
      contentRef.current?.setNativeProps({
        selection: { start: newPosition, end: newPosition },
      });
    });
  };

  // Handle checkbox insertion
  const insertCheckbox = () => {
    const { start } = selection;
    let lineStart = content.lastIndexOf("\n", start - 1) + 1;

    const newText =
      content.substring(0, lineStart) +
      "☐ " +
      content.substring(lineStart);

    setContent(newText);

    requestAnimationFrame(() => {
      contentRef.current?.focus();
      const newPosition = start + 2;
      contentRef.current?.setNativeProps({
        selection: { start: newPosition, end: newPosition },
      });
    });
  };

  // Handle text change with auto-continuation
  const handleContentChange = (text: string) => {
    const diff = text.length - content.length;

    // Check if user pressed Enter
    if (diff === 1 && text[selection.start] === "\n") {
      const lines = text.substring(0, selection.start + 1).split("\n");
      const currentLine = lines[lines.length - 2] || "";

      // Check for bullet point
      if (currentLine.trim().startsWith("•")) {
        if (currentLine.trim() === "•") {
          const lineStart = text.lastIndexOf("\n", selection.start - 1);
          const newText = text.substring(0, lineStart) + text.substring(selection.start + 1);
          setContent(newText);
          setTimeout(() => {
            contentRef.current?.setNativeProps({
              selection: { start: lineStart, end: lineStart },
            });
          }, 10);
          return;
        }
        const newText = text.substring(0, selection.start + 1) + "• " + text.substring(selection.start + 1);
        setContent(newText);
        setTimeout(() => {
          const newPosition = selection.start + 3;
          contentRef.current?.setNativeProps({
            selection: { start: newPosition, end: newPosition },
          });
        }, 10);
        return;
      }

      // Check for numbered list
      const numberMatch = currentLine.trim().match(/^(\d+)\.\s/);
      if (numberMatch) {
        if (currentLine.trim() === `${numberMatch[1]}.`) {
          const lineStart = text.lastIndexOf("\n", selection.start - 1);
          const newText = text.substring(0, lineStart) + text.substring(selection.start + 1);
          setContent(newText);
          setTimeout(() => {
            contentRef.current?.setNativeProps({
              selection: { start: lineStart, end: lineStart },
            });
          }, 10);
          return;
        }
        const nextNumber = parseInt(numberMatch[1]) + 1;
        const newText = text.substring(0, selection.start + 1) + `${nextNumber}. ` + text.substring(selection.start + 1);
        setContent(newText);
        setTimeout(() => {
          const newPosition = selection.start + `${nextNumber}. `.length + 1;
          contentRef.current?.setNativeProps({
            selection: { start: newPosition, end: newPosition },
          });
        }, 10);
        return;
      }

      // Check for checkbox
      if (currentLine.trim().startsWith("☐")) {
        if (currentLine.trim() === "☐") {
          const lineStart = text.lastIndexOf("\n", selection.start - 1);
          const newText = text.substring(0, lineStart) + text.substring(selection.start + 1);
          setContent(newText);
          setTimeout(() => {
            contentRef.current?.setNativeProps({
              selection: { start: lineStart, end: lineStart },
            });
          }, 10);
          return;
        }
        const newText = text.substring(0, selection.start + 1) + "☐ " + text.substring(selection.start + 1);
        setContent(newText);
        setTimeout(() => {
          const newPosition = selection.start + 3;
          contentRef.current?.setNativeProps({
            selection: { start: newPosition, end: newPosition },
          });
        }, 10);
        return;
      }
    }

    setContent(text);
  };

  const getWordCount = () => {
    if (!content.trim()) return 0;
    return content.trim().split(/\s+/).filter(Boolean).length;
  };

  const getCharCount = () => {
    return content.length;
  };

  const getLineCount = () => {
    if (!content) return 0;
    return content.split("\n").length;
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
        {/* Formatting Toolbar */}
        <View className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-4 py-2.5"
            contentContainerStyle={{ gap: 6 }}
            keyboardShouldPersistTaps="always"
          >
            <ToolButton onPress={() => insertBullet()} icon="•" />
            <ToolButton onPress={() => insertNumberedList()} icon="1." />
            <ToolButton onPress={() => insertCheckbox()} icon="☐" />
          </ScrollView>
        </View>

        <ScrollView
          className="flex-1"
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 500 }}
        >
          <View className="px-5 pt-5 flex-1">
            {/* META INFO */}
            {(createdAt || updatedAt) && (
              <View className="mb-4 pb-3 border-b border-gray-100 dark:border-gray-800">
                {createdAt && (
                  <Text className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    📅 Created: {formatDate(createdAt)}
                  </Text>
                )}
                {updatedAt && (
                  <Text className="text-xs text-gray-500 dark:text-gray-400">
                    🕒 Updated: {formatDate(updatedAt)}
                  </Text>
                )}
              </View>
            )}

            {/* Title */}
            <TextInput
              ref={titleRef}
              value={title}
              onChangeText={setTitle}
              placeholder="Untitled Note"
              placeholderTextColor="#9CA3AF"
              className="text-3xl font-bold text-black dark:text-white mb-6"
              autoFocus={autoFocus}
              returnKeyType="next"
              onSubmitEditing={() => contentRef.current?.focus()}
            />

            {/* Content */}
            {searchQuery.trim() ? (
              <ScrollView ref={scrollRef} className="min-h-[500px]">
                <Text className="text-base leading-7 text-black dark:text-white">
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
                onChangeText={handleContentChange}
                onSelectionChange={(e) => setSelection(e.nativeEvent.selection)}
                placeholder="Start writing your note...

Tip: Use the toolbar above to add bullets, numbers, or checkboxes. Press Enter to continue lists automatically."
                placeholderTextColor="#9CA3AF"
                multiline
                textAlignVertical="top"
                className="text-base text-black dark:text-white min-h-[500px] leading-7"
              />
            )}
          </View>
        </ScrollView>

        {/* Bottom Stats Bar */}
        {!isKeyboardVisible && (
          <View className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
            <View className="px-5 py-3 flex-row items-center justify-between">
              <View className="flex-row items-center gap-4">
                <View className="flex-row items-center">
                  <Text className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    {getWordCount()}
                  </Text>
                  <Text className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                    words
                  </Text>
                </View>

                <View className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />

                <View className="flex-row items-center">
                  <Text className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    {getCharCount()}
                  </Text>
                  <Text className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                    characters
                  </Text>
                </View>

                <View className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />

                <View className="flex-row items-center">
                  <Text className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    {getLineCount()}
                  </Text>
                  <Text className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                    lines
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Toolbar Button Component
type ToolButtonProps = {
  onPress: () => void;
  icon: string;
};

const ToolButton = ({ onPress, icon }: ToolButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="items-center justify-center w-10 h-10 bg-white dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-700 active:bg-gray-100 dark:active:bg-gray-800 shadow-sm"
      activeOpacity={0.7}
    >
      <Text className="text-base text-gray-700 dark:text-gray-300">
        {icon}
      </Text>
    </TouchableOpacity>
  );
};

export default NoteEditor;