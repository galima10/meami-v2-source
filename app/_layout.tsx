import { getDb } from "@database/database";
import { store } from "@stores/index";
import { fetchInitialDataThunk } from "@stores/thunks/seeds";
import { Stack } from "expo-router";
import { useAppDispatch, useAppSelector } from "modules/shared/hooks/redux";
import { useEffect } from "react";
import { Provider } from "react-redux";
import HiddenResetButton from "@modules/shared/components/atoms/test/HiddenResetButton";
import TestButton from "@modules/shared/components/atoms/test/TestButton";
import type { AppDispatch } from "@stores/index";

async function initDBAndFetch(dispatch: AppDispatch) {
  await getDb();
  dispatch(fetchInitialDataThunk());
}

function InitData() {
  const dispatch = useAppDispatch();
  const seedsLoaded = useAppSelector((state) => state.seed.hasLoaded);

  useEffect(() => {
    if (!seedsLoaded) {
      initDBAndFetch(dispatch);
    }
  }, [seedsLoaded]);

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
      {/* <HiddenResetButton /> */}
      {/* <TestButton /> */}
    </Provider>
  );
}
