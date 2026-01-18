import { View, Animated } from "react-native";
import { useEffect, useRef } from "react";
import { useRouter } from "expo-router";

export default function Splash() {
  const router = useRouter();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      router.replace("/login"); // or "/home"
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-black">
      <Animated.Image
        source={require("../assets/images/icon.png")}
        style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}
        className="w-40 h-40"
        resizeMode="contain"
      />
      <Animated.Text
        style={{ opacity: fadeAnim }}
        className="mt-4 text-lg font-semibold text-black dark:text-white"
      >
        Welcome to NoteVault
      </Animated.Text>
    </View>
  );
}
