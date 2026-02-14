import { ScrollView, Text, Linking, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import BackButton from "@/components/BackButton";

const About = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      {/* Header with back button */}
      <View className="flex-row items-center px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        <BackButton />
        <Text className="text-xl font-bold text-black dark:text-white ml-4">
          About NoteVault
        </Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text className="text-base text-black dark:text-white">
          <Text className="font-bold">NoteVault</Text> is a secure and user-friendly note-taking and todo app developed by PixelMint. Our mission is to provide a reliable platform for managing personal notes and tasks efficiently.
        </Text>

        <Text className="text-lg font-semibold text-black dark:text-white mt-4 mb-2">
          Features
        </Text>
        <Text className="text-base text-black dark:text-white mb-2">
          • Create and manage notes securely.
        </Text>
        <Text className="text-base text-black dark:text-white mb-2">
          • Organize todos and track tasks.
        </Text>
        <Text className="text-base text-black dark:text-white mb-2">
          • Share notes with other apps.
        </Text>
        <Text className="text-base text-black dark:text-white mb-2">
          • Search notes for quick access.
        </Text>
        <Text className="text-base text-black dark:text-white mb-2">
          • Push notifications to remind you about important tasks.
        </Text>

        <Text className="text-lg font-semibold text-black dark:text-white mt-4 mb-2">
          Version History
        </Text>
        <Text className="text-base text-black dark:text-white mb-2">
          Version 26.2.14 (Feb 2026): Initial release with notes, todos, search, sharing, and notifications.
        </Text>

        <Text className="text-lg font-semibold text-black dark:text-white mt-4 mb-2">
          Mission
        </Text>
        <Text className="text-base text-black dark:text-white mb-2">
          To provide a simple, secure, and effective way for users to manage their personal notes and tasks anywhere.
        </Text>

        <Text className="text-lg font-semibold text-black dark:text-white mt-4 mb-2">
          Contact & Website
        </Text>
        <TouchableOpacity onPress={() => Linking.openURL("https://www.moinnaik.bio")}>
          <Text className="text-[#2563EB] underline text-base mb-2">https://www.moinnaik.bio</Text>
        </TouchableOpacity>

        <Text className="text-base text-black dark:text-white mb-2">
          For support or inquiries, use the in-app{" "}
          <Text
            onPress={() => router.replace("/contact" as any)}
            className="font-bold text-[#2563EB]"
          >
            Contact Us
          </Text>{" "}
          form.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default About;
