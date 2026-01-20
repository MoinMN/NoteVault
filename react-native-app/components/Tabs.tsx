import { BottomNavigation } from 'react-native-paper';
import { useTheme } from "@/context/ThemeContext";
import NotesScreen from "../app/(app)/notes";
import TodosScreen from "../app/(app)/todos";
import React, { useState } from "react";

const Tabs = () => {
  const { theme } = useTheme() as any;
  const [index, setIndex] = useState(0);

  const isDark = theme === "dark";

  const routes = [
    {
      key: 'notes',
      title: 'Notes',
      focusedIcon: 'file-document',
      unfocusedIcon: 'file-document-outline'
    },
    {
      key: 'todos',
      title: 'Todos',
      focusedIcon: 'clipboard-check-outline',
      unfocusedIcon: 'clipboard-outline'
    },
  ];

  const renderScene = BottomNavigation.SceneMap({
    notes: NotesScreen,
    todos: TodosScreen,
  });

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