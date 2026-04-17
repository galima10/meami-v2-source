import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { AppText } from "../../primitives/AppText";
import theme from "@constants/themes";
import { FONT_BASE } from "@constants/general";
import { useState } from "react";
import { typography } from "@constants/styles";

interface QuantifierModuleProps {
  addAction?: () => void;
  removeAction?: () => void;
  value: number;
  style?: StyleProp<ViewStyle>;
  onValidateEntry?: (value: number) => void;
}

export default function QuantifierModule({
  addAction,
  removeAction,
  value,
  style,
  onValidateEntry,
}: QuantifierModuleProps) {
  const [number, onChangeNumber] = useState(value.toString());
  return (
    <View style={[styles.container, style as object]}>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonActive]}
        onPress={() => removeAction?.()}
      >
        <AppText>-</AppText>
      </Pressable>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={onChangeNumber}
        value={number}
        maxLength={number.includes(".") ? 3 : 2}
        selection={{ start: number.length, end: number.length }}
        onBlur={() => {
          if (number === "" || isNaN(Number(number)) || Number(number) < 0) {
            onChangeNumber("0");
          }
          onValidateEntry?.(Number(number));
        }}
      />
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonActive]}
        onPress={() => addAction?.()}
      >
        <AppText>+</AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: FONT_BASE * 0.5,
    height: FONT_BASE * 2.5,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: FONT_BASE * 1.5,
    borderWidth: 1,
    boxShadow: theme.properties.littleShadow,
    backgroundColor: theme.properties.vibrantBeige,
    borderColor: theme.properties.vibrantBeigeBorder,
    borderRadius: FONT_BASE * 0.5,
  },
  labelButton: {
    fontWeight: theme.properties.bold,
  },
  buttonActive: {
    backgroundColor: theme.properties.beige,
    borderColor: theme.properties.beigeBorder,
  },
  input: {
    width: FONT_BASE * 2,
    backgroundColor: theme.properties.white,
    borderWidth: 0.5,
    borderColor: theme.properties.whiteBorder,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    color: theme.properties.brown,
    fontSize: typography.body,
    fontFamily: "SN",
    textAlign: "center",
    borderRadius: FONT_BASE * 0.5,
    boxShadow: theme.properties.littleShadow,
  },
});
