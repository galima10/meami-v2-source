import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="menuTab"
        options={{
          title: "Menu",
        }}
      />
      <Tabs.Screen
        name="cartTab"
        options={{
          title: "Courses",
        }}
      />
      <Tabs.Screen
        name="stockTab"
        options={{
          title: "Stock",
        }}
      />
      <Tabs.Screen
        name="infosTab"
        options={{
          title: "Infos",
        }}
      />
    </Tabs>
  );
}
