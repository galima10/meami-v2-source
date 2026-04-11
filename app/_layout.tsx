import { getDb } from "@database/database";
import { store } from "@stores/index";
import { fetchInitialDataThunk } from "@stores/thunks/seeds";
import { fetchAllMenusThunk } from "@stores/thunks/weeklyMenu";
import { Stack } from "expo-router";
import { useAppDispatch } from "modules/shared/hooks/redux";
import { useEffect } from "react";
import { Provider } from "react-redux";
import HiddenResetButton from "@modules/shared/components/atoms/HiddenResetButton";
import TestButton from "@modules/shared/components/atoms/TestButton";

function InitData() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function initDBAndFetch() {
      await getDb();
      dispatch(fetchInitialDataThunk());
      
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
      {/* <HiddenResetButton />
      <TestButton /> */}
    </Provider>
  );
}
