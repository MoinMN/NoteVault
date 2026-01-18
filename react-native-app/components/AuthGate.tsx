import { useRouter, useSegments } from "expo-router";
import { useUser } from "../context/AuthContext";
import { useEffect } from "react";

export default function AuthGate({ children, }: { children: React.ReactNode; }) {
  const { isAuthenticated, loading } = useUser();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inAppGroup = segments[0] === "(app)";

    // 🔐 Not logged in → block (app)
    if (!isAuthenticated && inAppGroup) {
      router.replace("/(auth)/login");
    }

    // 🔁 Logged in → block (auth)
    if (isAuthenticated && inAuthGroup) {
      router.replace("/(app)/todos");
    }
  }, [isAuthenticated, loading, segments, router]);

  if (loading) return null; // or splash screen

  return children;
}
