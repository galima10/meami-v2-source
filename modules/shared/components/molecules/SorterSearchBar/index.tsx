import AppIconButton from "../../atoms/buttons/AppIconButton";
import { TextInput, StyleSheet, View, Pressable } from "react-native";
import { FONT_BASE } from "@constants/general";
import AppIcon from "../../primitives/AppIcon";
import { typography } from "@constants/styles";
import theme from "@constants/themes";
import { useState } from "react";

export default function SorterSearchBar() {
  const [barType, setBarType] = useState<"search" | "sort">("sort");
  return (
    <View style={styles.container}>
      {barType === "search" ? (
        <TextInput keyboardType="default" />
      ) : (
        <Pressable style={styles.sorterButton}></Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    gap: FONT_BASE,
  },
  searchInput: {
    width: 5,
    height: 5,
    backgroundColor: "red",
  },
  sorterButton: {
    width: 5,
    height: 5,
    backgroundColor: "red",
  },
});
