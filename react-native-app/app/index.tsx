import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "../context/AuthContext";

export default function Index() {
  const { user, loading, maintenance } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (maintenance) {
      router.replace("/maintenance");
      return;
    }

    if (!loading) {
      if (user) {
        router.replace("/(app)/todos");
      } else {
        router.replace("/(auth)/login");
      }
    }
  }, [user, loading, maintenance, router]);

  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" />
    </View>
  );
}
