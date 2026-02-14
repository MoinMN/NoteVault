import { createContext, useEffect, useState, ReactNode, useContext, useCallback } from "react";
import * as SecureStore from "expo-secure-store";
import api from "../lib/api";
import { clearMasterKey } from "@/lib/encryption";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  profileImage: string | null;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  maintenance: boolean;
  refreshAuth: () => Promise<void>;
  logout: () => Promise<void>;
};

type Props = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useUser = () => useContext(AuthContext);

const TOKEN_KEY = "auth_token";

export function AuthProvider({ children }: Props) {
  const [maintenance, setMaintenance] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUserFromToken = useCallback(async () => {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      // Add timeout to prevent infinite loading
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timeout")), 10000)
      );

      const apiPromise = api.get("/auth/me");

      const res = await Promise.race([apiPromise, timeoutPromise]) as any;

      if (res.data.success) {
        setUser(res.data.user);
      } else {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        setUser(null);
      }
    } catch (error: any) {
      // Network error or timeout - show maintenance
      if (!error?.response || error.message === "Request timeout") {
        setMaintenance(true);
        setUser(null);
      } else {
        // Other errors - clear token
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUserFromToken();
  }, [loadUserFromToken]);

  const refreshAuth = async () => {
    setLoading(true);
    await loadUserFromToken();
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await clearMasterKey();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        maintenance,
        loading,
        refreshAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}