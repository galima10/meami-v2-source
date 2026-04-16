import { Tabs } from "expo-router";
import React from "react";
import AppTabBar from "@modules/shared/components/molecules/AppTabBar";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        lazy: true,
      }}
      tabBar={(props) => <AppTabBar {...props} />}
    >
      <Tabs.Screen
        name="menuTab"
        options={{
          title: "Menu",
          freezeOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="cartTab"
        options={{
          title: "Courses",
          freezeOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="stockTab"
        options={{
          title: "Stock",
          freezeOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="infosTab"
        options={{
          title: "Infos",
          freezeOnBlur: true,
        }}
      />
    </Tabs>
  );
}
