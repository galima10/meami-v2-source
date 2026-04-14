import { Pressable, StyleSheet } from "react-native";
import theme from "@constants/themes";
import AppIcon from "@modules/shared/components/primitives/AppIcon";
import { FONT_BASE } from "@constants/general";
import { useRouter, type Href, usePathname } from "expo-router";

interface TopButtonProps {
  icon: string;
  route?: Href;
}

export default function TopButton({ icon, route }: TopButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  function handlePress() {
    if (!route) return;
    if (pathname === route) return;
    router.push(route);
  }

  return (
    <Pressable style={styles.button} onPress={handlePress}>
      <AppIcon name={icon} size={28} color={theme.properties.beige} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: FONT_BASE * 3.25,
    width: FONT_BASE * 3.25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: FONT_BASE,
    opacity: 0.5,
  },
  active: {},
});
