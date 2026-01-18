import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import api from "@/lib/api";
import { useAlert } from "@/context/AlertContext";

const contactTypes = [
  "General Inquiry",
  "Bug Report",
  "Data Deletion Request",
  "Feature Request",
  "Other",
];

const Contact = () => {
  const router = useRouter();

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(contactTypes[0]);

  const { setAlert } = useAlert();

  const handleSubmit = async () => {
    if (!message) {
      return setAlert({ message: "Please fill all required fields", type: "warning" });
    }
    setLoading(true);
    try {
      const response = await api.post("/support/contact", { subject, message, type });

      if (response.data?.success) {
        setAlert({ message: response.data?.msg, type: "success" });
        setSubject("");
        setMessage("");
        router.back();
      } else {
        setAlert({ message: response.data?.msg || "Something went wrong", type: "error" });
      }
    } catch {
      setAlert({ message: "Network error. Try again later.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={26} color="#2563EB" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-black dark:text-white ml-4">
          Contact Us
        </Text>
      </View>

      <ScrollView className="p-4">
        {/* Subject */}
        <Text className="text-black dark:text-white mb-1">Subject</Text>
        <TextInput
          value={subject}
          onChangeText={setSubject}
          className="bg-gray-100 dark:bg-[#1C1C1E] text-black dark:text-white px-3 py-3 rounded-xl mb-3"
          placeholder="Optional"
          placeholderTextColor="#9CA3AF"
        />

        {/* Type */}
        <Text className="text-black dark:text-white mb-1">Request Type</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-3">
          {contactTypes.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => setType(item)}
              className={`px-3 py-2 rounded-full mr-2 ${type === item ? "bg-blue-500" : "bg-gray-200 dark:bg-[#2C2C2E]"
                }`}
            >
              <Text className={type === item ? "text-white" : "text-black dark:text-white"}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Message */}
        <Text className="text-black dark:text-white mb-1">Message *</Text>
        <TextInput
          value={message}
          onChangeText={setMessage}
          multiline
          textAlignVertical="top"
          className="bg-gray-100 dark:bg-[#1C1C1E] text-black dark:text-white px-3 py-3 rounded-xl mb-5 min-h-[140px]"
          placeholder="Write your message..."
          placeholderTextColor="#9CA3AF"
        />

        {/* Submit */}
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={loading} // disable button while loading
          className={`py-3 rounded-xl items-center ${loading ? "bg-blue-400" : "bg-blue-500"}`}
        >
          {loading ? (
            <View className="flex-row items-center">
              <ActivityIndicator size="small" color="#fff" />
              <Text className="text-white font-semibold text-base ml-2">
                Sending...
              </Text>
            </View>
          ) : (
            <Text className="text-white font-semibold text-base">Send Message</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Contact;