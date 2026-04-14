import { Stack } from "expo-router";
import AppTopBar from "@modules/shared/components/molecules/AppTopBar";

export default function MenuTabLayout() {
  return (
    <Stack screenOptions={{ header: (props) => <AppTopBar {...props} /> }} />
  );
}
