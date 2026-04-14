import AppIcon from "../../appElements/AppIcon";
import { Pressable, StyleSheet } from "react-native";
import { AppText } from "../../appElements/AppText";
import { tabiconsMap } from "@constants/mappings/icons/tabIconsMap";
import theme from "@constants/themes";
import { FONT_BASE } from "@constants/general";

interface TabButtonProps {
  isFocused: boolean;
  text: string;
  onPress: () => void;
  icon: string;
}

export default function TabButton({
  isFocused,
  text,
  onPress,
  icon,
}: TabButtonProps) {
  return (
    <Pressable
      style={[
        styles.button,
        isFocused && {
          borderWidth: 1,
          boxShadow: theme.properties.littleShadow,
        },
      ]}
      onPress={onPress}
    >
      <AppIcon
        name={tabiconsMap[icon]}
        size={32}
        color={
          isFocused
            ? theme.properties.vibrantOrange
            : theme.properties.transparentBrown
        }
      />
      <AppText
        style={[
          styles.text,
          {
            color: isFocused
              ? theme.properties.vibrantOrange
              : theme.properties.transparentBrown,
          },
        ]}
      >
        {text}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    width: FONT_BASE * 4.5,
    height: FONT_BASE * 4.5,
    justifyContent: "center",
    gap: 4,
    borderRadius: FONT_BASE,
    borderColor: theme.properties.beigeBorder,
  },
  text: {
    fontWeight: theme.properties.bold,
  },
});
