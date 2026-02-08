import { Pressable, Text, Image, ActivityIndicator } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import * as SecureStore from "expo-secure-store";
import api from "@/lib/api";
import { useUser } from "@/context/AuthContext";
import { useAlert } from "@/context/AlertContext";
import { useRouter } from "expo-router";
import ErrorCatch from "@/lib/error-catch";

export default function GoogleLoginButton({
  loading, setLoading
}: {
  loading: boolean, setLoading: (v: boolean) => void
}) {
  const router = useRouter();
  const { refreshAuth } = useUser();
  const { setAlert } = useAlert();

  const handleGoogleSignIn = async () => {
    if (loading) return;

    try {
      setLoading(true);

      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      // 👇 dev only (keep for QA)
      await GoogleSignin.signOut();

      const userInfo = await GoogleSignin.signIn();

      const idToken = userInfo.data?.idToken;

      if (!idToken) {
        throw new Error("Google Sign In Failed");
      }

      const res = await api.post("/auth/google", { idToken });

      await SecureStore.setItemAsync("auth_token", res.data.token);
      await refreshAuth();
      router.replace("/todos");
    } catch (error: any) {
      console.log("Google SignIn Error:", error);
      ErrorCatch(error, setAlert);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Pressable
      onPress={handleGoogleSignIn}
      disabled={loading}
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 48,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#DADCE0",
        backgroundColor: "#FFFFFF",
        opacity: pressed || loading ? 0.7 : 1,
      })}
    >
      {loading ? (
        <ActivityIndicator color="#4285F4" />
      ) : (
        <>
          <Image
            source={require("@/assets/images/google.png")}
            style={{ width: 20, height: 20, marginRight: 12 }}
            resizeMode="contain"
          />
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              color: "#3C4043",
            }}
          >
            Continue with Google
          </Text>
        </>
      )}
    </Pressable>
  );
}
