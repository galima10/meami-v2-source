import { FlashList } from "@shopify/flash-list";
import { View, StyleSheet } from "react-native";
import AppIcon from "../../primitives/AppIcon";
import AppIconButton from "../../atoms/buttons/AppIconButton";
import SorterSearchBar from "../../molecules/SorterSearchBar";

export default function ListContainer() {
  return (
    <View>
      <SorterSearchBar />
    </View>
  );
}
