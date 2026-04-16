import { Pressable, StyleSheet, View } from "react-native";
import theme from "@constants/themes";
import AppIcon from "@modules/shared/components/primitives/AppIcon";
import { FONT_BASE } from "@constants/general";
import { type Href, usePathname } from "expo-router";
import { useAppNavigation } from "@modules/shared/hooks/useAppNavigation";

interface TopButtonProps {
  icon: string;
  route?: Href;
  color?: "red" | "green" | "info";
  routeAction?: "replace" | "push" | "back";
  action?: () => void;
  disabled?: boolean;
  togglable?: boolean;
}

export default function TopButton({
  icon,
  route,
  color,
  routeAction = "replace",
  action,
  disabled,
  togglable = true,
}: TopButtonProps) {
  const pathname = usePathname();
  const { handleNavigate } = useAppNavigation();
  function handlePress() {
    action?.();
    if (pathname === route) return;
    handleNavigate(route, routeAction);
  }

  const buttonStyle = [
    styles.button,
    color === "green" && greenButtonStyle.base,
    color === "red" && redButtonStyle.base,
    !color &&
      (togglable
        ? pathname === route
          ? normalButtonStyle.active
          : normalButtonStyle.base
        : normalButtonStyle.active),
    color === "info" && infoButtonStyle.base,
    disabled && styles.disabled,
  ];

  return (
    <Pressable style={buttonStyle} onPress={handlePress}>
      <AppIcon
        name={icon}
        size={FONT_BASE * 1.75}
        color={
          color === "info" ? theme.properties.brown : theme.properties.beige
        }
      />
      {color === "info" && <View style={styles.notification} />}
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
    position: "relative",
  },
  disabled: {
    opacity: 0.5,
  },
  notification: {
    width: FONT_BASE,
    height: FONT_BASE,
    backgroundColor: theme.properties.darkRed,
    position: "absolute",
    top: -FONT_BASE / 3,
    left: -FONT_BASE / 3,
    borderRadius: "50%",
    borderWidth: 0.5,
    borderColor: theme.properties.redBorder,
    boxShadow: theme.properties.littleShadow,
  },
});

const normalButtonStyle = StyleSheet.create({
  base: {
    opacity: 0.5,
  },
  active: {
    backgroundColor: theme.properties.lightOrange,
    borderColor: theme.properties.lightOrangeBorder,
    boxShadow: theme.properties.littleShadow,
    opacity: 1,
    borderWidth: 0.5,
  },
});
const greenButtonStyle = StyleSheet.create({
  base: {
    backgroundColor: theme.properties.darkGreen,
    borderColor: theme.properties.greenBorder,
    borderWidth: 1,
    boxShadow: theme.properties.littleShadow,
  },
});
const redButtonStyle = StyleSheet.create({
  base: {
    backgroundColor: theme.properties.darkRed,
    borderColor: theme.properties.redBorder,
    borderWidth: 1,
    boxShadow: theme.properties.littleShadow,
  },
});

const infoButtonStyle = StyleSheet.create({
  base: {
    backgroundColor: theme.properties.white,
    borderColor: theme.properties.whiteBorder,
    borderWidth: 0.5,
    boxShadow: theme.properties.littleShadow,
  },
});
