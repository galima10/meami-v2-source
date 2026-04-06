import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "@stores/index";
import { getDb } from "@database/database";
import { useEffect } from "react";
import { useAppDispatch } from "features/shared/hooks/redux";
import { fetchInitialDataThunk } from "@stores/thunks/seeds";
import { fetchAllMenusThunk } from "@stores/thunks/weeklyMenu";

function InitData() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function initDBAndFetch() {
      await getDb();
      dispatch(fetchInitialDataThunk());
      dispatch(fetchAllMenusThunk());
    }

    initDBAndFetch();
  }, [dispatch]);

  return null;
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <InitData />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(splash)/index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
