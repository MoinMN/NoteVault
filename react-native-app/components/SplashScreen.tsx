import { View, Image, ActivityIndicator, Animated } from "react-native";
import { useUser } from "@/context/AuthContext";
import { useEffect, useRef } from "react";
import { useRouter } from "expo-router";

export function AnimatedSplashScreen() {
  const { user, loading, maintenance } = useUser();
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Fade in animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    if (loading) return;

    const timer = setTimeout(() => {
      if (maintenance) {
        router.replace("/maintenance");
      } else if (user) {
        router.replace("/(app)/todos");
      } else {
        router.replace("/(auth)/login");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [user, loading, maintenance]);

  return (
    <View className="flex-1 justify-center items-center bg-white dark:bg-black">
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
          alignItems: "center",
        }}
      >
        <Image
          source={require("@/assets/images/icon.png")}
          className="w-32 h-32 mb-8"
          resizeMode="contain"
        />
      </Animated.View>

      <ActivityIndicator size="large" color="#2563EB" />
    </View>
  );
}