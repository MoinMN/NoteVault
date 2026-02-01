import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Slot, useRouter } from "expo-router";
import Loader from "@/components/ui/Loader";

const AuthLayout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("auth_token");
        if (token) {
          router.replace("/notes"); // replace with your main app route
        } else {
          setLoading(false); // No token → show auth screens
        }
      } catch (err) {
        console.log("Error checking auth token:", err);
        setLoading(false);
      }
    };

    checkAuthToken();
  }, []);

  if (loading) return <Loader />

  // Render children (Login/Register/ForgotPassword)
  return <><Slot /></>;
};

export default AuthLayout;
