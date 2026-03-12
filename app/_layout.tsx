import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "@stores/index";
import { initDatabase } from "@database/init";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    async function setupDatabase() {
      await initDatabase();
    }

    setupDatabase();
  }, []);
  
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(splash)/index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
