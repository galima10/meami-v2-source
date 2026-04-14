import { Tabs } from "expo-router";
import React from "react";
import AppTabBar from "@modules/shared/components/molecules/AppTabBar";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <AppTabBar {...props} />}
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
