import { createContext, useEffect, useState, ReactNode, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import api from "../lib/api";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin"
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUserFromToken = async () => {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);

      if (!token) {
        setUser(null);
        return;
      }

      const res = await api.get("/auth/me");

      if (res.data.success) {
        setUser(res.data.user);
      } else {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        setUser(null);
      }
    } catch {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      setUser(null);
    }
  };

  useEffect(() => {
    loadUserFromToken().finally(() => setLoading(false));
  }, []);

  const refreshAuth = async () => {
    await loadUserFromToken();
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        refreshAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

