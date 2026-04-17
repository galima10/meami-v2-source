import { FlashList } from "@shopify/flash-list";
import { View, StyleSheet } from "react-native";
import AppIcon from "../../primitives/AppIcon";
import AppIconButton from "../../atoms/buttons/AppIconButton";
import SorterSearchBar from "../../molecules/SorterSearchBar";
import { FONT_BASE } from "@constants/general";
import theme from "@constants/themes";

export default function ListContainer() {
  return (
    <View style={styles.container}>
      <SorterSearchBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.properties.beige,
  },
});
