import { BottomNavigation } from 'react-native-paper';
import { useTheme } from "@/context/ThemeContext";
import NotesScreen from "../app/(app)/notes";
import AdminScreen from "../app/(app)/admin";
import TodosScreen from "../app/(app)/todos";
import React, { useMemo, useState } from "react";
import { useUser } from '@/context/AuthContext';

const Tabs = () => {
  const { theme } = useTheme() as any;
  const [index, setIndex] = useState(0);

  const isDark = theme === "dark";

  const { user } = useUser();
  const isAdmin = user?.role === "admin";

  const routes = useMemo(() => {
    const baseRoutes = [
      {
        key: "notes",
        title: "Notes",
        focusedIcon: "file-document",
        unfocusedIcon: "file-document-outline",
      },
      {
        key: "todos",
        title: "Todos",
        focusedIcon: "clipboard-check-outline",
        unfocusedIcon: "clipboard-outline",
      },
    ];

    if (isAdmin) {
      baseRoutes.push({
        key: "admin",
        title: "Admin",
        focusedIcon: "shield-account",
        unfocusedIcon: "shield-account-outline",
      });
    }

    return baseRoutes;
  }, [isAdmin]);

  const renderScene = useMemo(
    () =>
      BottomNavigation.SceneMap({
        notes: NotesScreen,
        todos: TodosScreen,
        admin: AdminScreen,
      }),
    []
  );

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      activeColor="#2563EB"
      inactiveColor={isDark ? "#FFFFFF" : "#000000"}
      barStyle={{
        backgroundColor: isDark ? "#121314" : "#F3F4F6",
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        elevation: 8,
      }}
      activeIndicatorStyle={{
        backgroundColor: isDark ? "#2e4689a0" : "#DBEAFE",
      }}
      shifting={true}
    />
  );
};

export default Tabs;