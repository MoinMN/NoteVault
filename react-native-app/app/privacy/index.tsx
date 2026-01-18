import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const PrivacyPolicy = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      {/* Header with back button */}
      <View className="flex-row items-center px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={26} color="#2563EB" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-black dark:text-white ml-4">
          Privacy Policy
        </Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text className="text-base text-black dark:text-white mb-3">
          Welcome to <Text className="font-bold">NoteVault</Text> (operated by PixelMint). Your privacy is important to us, and we are committed to protecting your personal information.
        </Text>

        <Text className="text-lg font-semibold text-black dark:text-white mt-4 mb-2">
          1. Information We Collect
        </Text>
        <Text className="text-base text-black dark:text-white mb-2">
          We collect the following information from users:
        </Text>
        <Text className="text-base text-black dark:text-white mb-2">
          • Name, email, and encrypted password.
        </Text>
        <Text className="text-base text-black dark:text-white mb-2">
          • Notes and todo items created by the user.
        </Text>

        <Text className="text-lg font-semibold text-black dark:text-white mt-4 mb-2">
          2. How We Use Your Information
        </Text>
        <Text className="text-base text-black dark:text-white mb-2">
          • To provide and maintain your account and access to your notes.
        </Text>
        <Text className="text-base text-black dark:text-white mb-2">
          • To allow note sharing via apps on your device.
        </Text>
        <Text className="text-base text-black dark:text-white mb-2">
          • To improve our services and app experience.
        </Text>

        <Text className="text-lg font-semibold text-black dark:text-white mt-4 mb-2">
          3. Data Storage
        </Text>
        <Text className="text-base text-black dark:text-white mb-2">
          All your information is stored securely on our backend (MongoDB). Passwords are encrypted, and notes are private to your account.
        </Text>

        <Text className="text-lg font-semibold text-black dark:text-white mt-4 mb-2">
          4. Sharing Your Data
        </Text>
        <Text className="text-base text-black dark:text-white mb-2">
          We do not share your personal data with any third parties. You can choose to share notes using the in-app share feature.
        </Text>

        <Text className="text-lg font-semibold text-black dark:text-white mt-4 mb-2">
          5. Notifications
        </Text>
        <Text className="text-base text-black dark:text-white mb-2">
          NoteVault may send push notifications. You can manage these notifications in your device settings.
        </Text>

        <Text className="text-lg font-semibold text-black dark:text-white mt-4 mb-2">
          6. Account Deletion
        </Text>
        <Text className="text-base text-black dark:text-white mb-2">
          You can request deletion of your account and all associated data directly through the app.
        </Text>

        <Text className="text-lg font-semibold text-black dark:text-white mt-4 mb-2">
          7. Children
        </Text>
        <Text className="text-base text-black dark:text-white mb-2">
          There is no age restriction for using NoteVault, but we encourage parents to supervise children using the app.
        </Text>

        <Text className="text-lg font-semibold text-black dark:text-white mt-4 mb-2">
          8. Contact Us
        </Text>
        <Text className="text-base text-black dark:text-white mb-2">
          For questions about privacy or support, use the in-app{" "}
          <Text
            onPress={() => router.replace("/contact" as any)}
            className="font-bold text-[#2563EB]"
          >
            Contact Us
          </Text>{" "}
          form. We will respond promptly.
        </Text>

        <Text className="text-base text-black dark:text-white mt-6">
          By using NoteVault, you agree to this Privacy Policy.
        </Text>
        <Text className="text-base text-black dark:text-white">
          Last updated: <Text className="font-bold">January 2026</Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;
