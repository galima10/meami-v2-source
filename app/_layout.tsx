import { Stack } from "expo-router";
// import { Provider } from "react-redux";
// import { store } from "@stores/index";

export default function RootLayout() {
  return (
    // <Provider store={store}>
    // </Provider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(splash)/index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
  );
}
