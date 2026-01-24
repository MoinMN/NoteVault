import { useRouter, useSegments, usePathname } from "expo-router";
import { useUser } from "../context/AuthContext";
import { useEffect, useRef } from "react";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useUser();
  const segments = useSegments();
  const router = useRouter();
  const pathname = usePathname();
  const hasNavigated = useRef(false);

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inAppGroup = segments[0] === "(app)";
    const isRootPath = pathname === "/" || pathname === "";

    // Skip if already at the right place
    if (hasNavigated.current && !isRootPath) return;

    // Not logged in → redirect to login
    if (!isAuthenticated && inAppGroup) {
      hasNavigated.current = true;
      router.replace("/(auth)/login");
      return;
    }

    // Logged in → redirect to app
    if (isAuthenticated && (inAuthGroup || isRootPath)) {
      hasNavigated.current = true;
      router.replace("/(app)/todos");
      return;
    }
  }, [isAuthenticated, loading, segments, pathname]);

  return children;
}