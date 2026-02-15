import { Pressable, Text, Image, ActivityIndicator, StyleSheet, Platform } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import * as SecureStore from "expo-secure-store";
import api from "@/lib/api";
import { useUser } from "@/context/AuthContext";
import { useAlert } from "@/context/AlertContext";
import { useRouter } from "expo-router";
import ErrorCatch from "@/lib/error-catch";

export default function GoogleLoginButton({
  loading,
  setLoading,
}: {
  loading: boolean;
  setLoading: (v: boolean) => void;
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

      // Sign out first to force account picker
      const isSignedIn = GoogleSignin.hasPreviousSignIn();
      if (isSignedIn) {
        await GoogleSignin.signOut();
      }

      // This will now show the account picker
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
      style={({ pressed }) => [
        styles.button,
        {
          transform: [{ scale: pressed ? 0.98 : 1 }],
          opacity: loading ? 0.6 : 1,
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#4285F4" size="small" />
      ) : (
        <>
          <Image
            source={require("@/assets/images/google.png")}
            style={styles.icon}
            resizeMode="contain"
          />
          <Text style={styles.text}>Continue with Google</Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 52,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#DADCE0",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3C4043",
    letterSpacing: 0.2,
  },
});