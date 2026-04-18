import {
  Pressable,
  StyleSheet,
  type ViewStyle,
  type StyleProp,
} from "react-native";
import AppIcon from "@modules/shared/components/primitives/AppIcon";
import { AppText } from "@modules/shared/components/primitives/AppText";
import theme from "@constants/themes";
import { FONT_BASE } from "@constants/general";
import type { IconName } from "@modules/shared/hooks/primitives/useAppIcon";
import { useState } from "react";

interface AppIconButtonProps {
  style?: StyleProp<ViewStyle> | object;
  icon?: IconName;
  type?: "green" | "red" | "outline" | "today";
  action?: () => void;
  smallBin?: boolean;
}

export default function AppIconButton({
  style,
  icon,
  type,
  action,
  smallBin,
}: AppIconButtonProps) {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  return (
    <Pressable
      onPress={() => action?.()}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={[
        styles.button,
        type &&
          (type === "green"
            ? styles.green
            : (type === "red" || type === "today") && styles.red),
        isPressed &&
          (type === "green"
            ? styles.greenActive
            : (type === "red" || type === "today") && styles.redActive),
        type === "outline" &&
          smallBin && {
            width: FONT_BASE * 2,
            height: FONT_BASE * 2,
          },
        style,
      ]}
    >
      {type === "today" ? (
        <AppText style={styles.text}>Ajd</AppText>
      ) : (
        icon && (
          <AppIcon
            name={icon}
            color={
              type !== "outline"
                ? theme.properties.beige
                : isPressed
                  ? theme.properties.lightRed
                  : theme.properties.darkRed
            }
            size={
              type === "outline"
                ? smallBin
                  ? FONT_BASE * 1.75
                  : FONT_BASE * 2.75
                : FONT_BASE * 1.75
            }
          />
        )
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: FONT_BASE * 3,
    height: FONT_BASE * 3,
    alignItems: "center",
    justifyContent: "center",
  },
  red: {
    borderWidth: 1,
    borderColor: theme.properties.redBorder,
    backgroundColor: theme.properties.darkRed,
    boxShadow: theme.properties.littleShadow,
    borderRadius: FONT_BASE * 0.75,
  },
  green: {
    borderWidth: 1,
    borderColor: theme.properties.greenBorder,
    backgroundColor: theme.properties.darkGreen,
    boxShadow: theme.properties.littleShadow,
    borderRadius: FONT_BASE * 0.75,
  },
  redActive: {
    borderColor: theme.properties.lightRedBorder,
    backgroundColor: theme.properties.lightRed,
  },
  greenActive: {
    borderColor: theme.properties.lightGreenBorder,
    backgroundColor: theme.properties.lightGreen,
  },
  text: {
    fontWeight: theme.properties.bold,
    color: theme.properties.beige,
  },
});
