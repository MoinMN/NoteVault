import { View, Text, TouchableOpacity, Platform, Linking, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useUser } from "@/context/AuthContext";
import ThemeOption from "./_components/ThemeOption";
import BackButton from "@/components/BackButton";

const Settings = () => {
  const router = useRouter();

  const { user, logout } = useUser();

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  // Open app-specific notification settings
  const openAppNotificationSettings = () => {
    if (Platform.OS === "android") {
      Linking.openSettings(); // Opens app settings where user can manage notifications
    } else if (Platform.OS === "ios") {
      Linking.openURL("app-settings:"); // iOS opens app settings
    }
  };

  const getInitials = (fullName: string) => {
    const names = fullName.split(" ");
    return names.map((n) => n[0]).join("").toUpperCase();
  };

  const Row = ({ text, redirect }: { text: string; redirect: string }) => (
    <TouchableOpacity
      className="bg-gray-100 dark:bg-[#1C1C1E] px-4 py-3 rounded-xl mb-2 flex-row justify-between items-center"
      onPress={() => router.push(`/${redirect}` as any)}
    >
      <Text className="text-black dark:text-white">{text}</Text>
      <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      {/* Header (Fixed) */}
      <View className="flex-row items-center px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        <BackButton />
        <Text className="text-xl font-bold text-black dark:text-white ml-4">
          Settings
        </Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* Profile */}
        <View className="bg-gray-100 dark:bg-[#1C1C1E] m-4 px-2 py-4 rounded-xl shadow flex-row items-center justify-between">
          <View className="w-16 h-16 rounded-full bg-blue-500 items-center justify-center">
            <Text className="text-white text-2xl font-bold">
              {getInitials(user?.name || "MMN")}
            </Text>
          </View>
          <View className="flex-1 ml-4">
            <Text className="text-xl font-bold text-black dark:text-white">
              {user?.name}
            </Text>
            <Text className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              {user?.email}
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-500 px-2 py-1 rounded-md items-center"
          >
            <Text className="text-white font-semibold text-sm">Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Notifications */}
        <View className="m-4">
          <Text className="text-lg font-semibold text-black dark:text-white mb-2">
            Notifications
          </Text>
          <TouchableOpacity
            onPress={openAppNotificationSettings}
            className="flex-row justify-between items-center bg-gray-100 dark:bg-[#1C1C1E] px-4 py-3 rounded-xl"
          >
            <Text className="text-black dark:text-white">Manage Notifications</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Theme */}
        <ThemeOption />

        {/* More Section */}
        <View className="m-4">
          <Text className="text-lg font-semibold text-black dark:text-white mb-2">
            More
          </Text>

          <View className="bg-gray-100 dark:bg-[#1C1C1E] px-4 py-3 rounded-xl mb-2 flex-row justify-between items-center">
            <Text className="text-black dark:text-white">Version</Text>
            <Text className="text-gray-500 dark:text-gray-400">26.1.18</Text>
          </View>

          <Row text="About Notes" redirect="about" />
          <Row text="Privacy Policy" redirect="privacy" />
          <Row text="Contact Us" redirect="contact" />
          {/* Signature */}
          <View className="mt-10 mb-6 items-center">
            <Text className="text-gray-500 dark:text-gray-400 text-sm">
              Developed by <Text className="font-semibold text-black dark:text-white">PixelMint</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;