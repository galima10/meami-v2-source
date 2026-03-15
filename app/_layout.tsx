import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "@stores/index";
import { getDb } from "@database/database";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    async function initDB() {
      await getDb();
    }
    initDB();
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
