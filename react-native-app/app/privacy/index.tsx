import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import BackButton from "@/components/BackButton";

const PrivacyPolicy = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        <BackButton />
        <Text className="text-xl font-bold text-black dark:text-white ml-4">
          Privacy Policy
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text className="text-base text-black dark:text-white mb-3">
          Welcome to <Text className="font-bold">NoteVault</Text> (operated by PixelMint).
          Your privacy is important to us, and we are committed to protecting your
          personal information.
        </Text>

        {/* 1 */}
        <Text className="text-lg font-semibold text-black dark:text-white mt-4 mb-2">
          1. Information We Collect
        </Text>
        <Text className="text-base text-black dark:text-white mb-2">
          We may collect the following information:
        </Text>
        <Text className="text-base text-black dark:text-white mb-2">
          • Name, email address, and encrypted password.
        </Text>
        <Text className="text-base text-black dark:text-white mb-2">
          • Profile image (if provided via Google Sign-In).
        </Text>
        <Text className="text-base text-black dark:text-white mb-2">
          • Notes and todo items created by the user.
        </Text>

        {/* 2 */}
        <Text className="text-lg font-semibold text-black dark:text-white mt-4 mb-2">
          2. Authentication (Google OAuth)
        </Text>
        <Text className="text-base text-black dark:text-white mb-2">
          NoteVault allows users to sign in using Google OAuth.
        </Text>
        <Text className="text-base text-black dark:text-white mb-2">
          When you sign in with Google, we receive basic profile information such
          as your name, email address, and profile image, as permitted by Google.
        </Text>
        <Text className="text-base text-black dark:text-white mb-2">
          We do not access your Google password or any other Google account data.
        </Text>

        {/* 3 */}
        <Text className="text-lg font-semibold text-black dark:text-white mt-4 mb-2">
          3. How We Use Your Information
        </Text>
        <Text className="text-base text-black dark:text-white mb-2">
          • To create and manage your account.
        </Text>
        <Text className="text-base text-black dark:text-white mb-2">
          • To securely authenticate users.
        </Text>
        <Text className="text-base text-black dark:text-white mb-2">
          • To display your profile name and profile image within the app.
        </Text>
        <Text className="text-base text-black dark:text-white mb-2">
          • To provide access to notes, todos, and sharing features.
        </Text>

        {/* 4 */}
        <Text className="text-lg font-semibold text-black dark:text-white mt-4 mb-2">
          4. Data Storage & Security
        </Text>
        <Text className="text-base text-black dark:text-white mb-2">
          All user data is stored securely on our backend (MongoDB).
        </Text>
        <Text className="text-base text-black dark:text-white mb-2">
          Passwords are encrypted, authentication tokens are securely handled,
          and profile images are stored only as references when fetched from
          Google.
        </Text>

        {/* 5 */}
        <Text className="text-lg font-semibold text-black dark:text-white mt-4 mb-2">
          5. Sharing Your Data
        </Text>
        <Text className="text-base text-black dark:text-white mb-2">
          We do not sell or share your personal data with third parties.
        </Text>
        <Text className="text-base text-black dark:text-white mb-2">
          Notes may only be shared when you explicitly use the in-app sharing
          feature.
        </Text>

        {/* 6 */}
        <Text className="text-lg font-semibold text-black dark:text-white mt-4 mb-2">
          6. Notifications
        </Text>
        <Text className="text-base text-black dark:text-white mb-2">
          NoteVault may send push notifications related to app activity.
          Notification permissions can be managed in device settings.
        </Text>

        {/* 7 */}
        <Text className="text-lg font-semibold text-black dark:text-white mt-4 mb-2">
          7. Account Deletion
        </Text>
        <Text className="text-base text-black dark:text-white mb-2">
          You can request deletion of your account and all associated data
          directly through the app.
        </Text>

        {/* 8 */}
        <Text className="text-lg font-semibold text-black dark:text-white mt-4 mb-2">
          8. Children
        </Text>
        <Text className="text-base text-black dark:text-white mb-2">
          There is no age restriction for using NoteVault. However, we encourage
          parental guidance for minors.
        </Text>

        {/* 9 */}
        <Text className="text-lg font-semibold text-black dark:text-white mt-4 mb-2">
          9. Contact Us
        </Text>
        <Text className="text-base text-black dark:text-white mb-2">
          For questions about privacy or support, use the in-app{" "}
          <Text
            onPress={() => router.replace("/contact" as any)}
            className="font-bold text-[#2563EB]"
          >
            Contact Us
          </Text>{" "}
          form.
        </Text>

        <Text className="text-base text-black dark:text-white mt-6">
          By using NoteVault, you agree to this Privacy Policy.
        </Text>
        <Text className="text-base text-black dark:text-white">
          Last updated: <Text className="font-bold">February 2026</Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;
