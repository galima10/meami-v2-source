import AppIconButton from "../../atoms/buttons/AppIconButton";
import { TextInput, StyleSheet, View, Pressable } from "react-native";
import { FONT_BASE } from "@constants/general";
import AppIcon from "../../primitives/AppIcon";
import { typography } from "@constants/styles";
import theme from "@constants/themes";
import { useState } from "react";
import { AppText } from "../../primitives/AppText";

interface SorterSearchBarProps {}

export default function SorterSearchBar({}: SorterSearchBarProps) {
  const [isSearchbarType, setIsSearchBarType] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>("");
  const handleOnSearchChange = (text: string) => {
    setSearchValue(text);
  };
  return (
    <View style={styles.container}>
      {isSearchbarType ? (
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchInput}
            value={searchValue}
            onChangeText={handleOnSearchChange}
            placeholder="Rechercher..."
            placeholderTextColor={theme.properties.transparentBrown}
          />
          <View style={styles.barIcon}>
            <AppIcon
              name="searchIcon"
              color={theme.properties.transparentBrown}
              size={FONT_BASE}
            />
          </View>
        </View>
      ) : (
        <Pressable
          style={({ pressed }) => [
            styles.sorterButton,
            pressed && { borderColor: theme.properties.white },
          ]}
        >
          <AppText style={{ color: theme.properties.transparentBrown }}>
            Trier
          </AppText>
          <View style={styles.barIcon}>
            <AppIcon
              name="sortIcon"
              color={theme.properties.transparentBrown}
              size={FONT_BASE}
            />
          </View>
        </Pressable>
      )}
      <AppIconButton
        icon="changeIcon"
        type="green"
        action={() => {
          setIsSearchBarType(!isSearchbarType);
          setSearchValue("");
        }}
      />
      <View style={styles.counterContainer}>
        <AppText style={styles.counter}>4</AppText>
        <AppIcon
          name="ingredientIcon"
          color={theme.properties.vibrantOrange}
          size={FONT_BASE * 1.5}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    gap: FONT_BASE,
    alignItems: "center",
    padding: FONT_BASE,
  },
  searchBarContainer: {
    flex: 1,
    height: FONT_BASE * 2,
    alignItems: "center",
    flexDirection: "row",
  },
  searchInput: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.properties.white,
    borderRadius: FONT_BASE,
    textAlignVertical: "center",
    borderWidth: 0.5,
    borderColor: theme.properties.whiteBorder,
    boxShadow: theme.properties.littleShadow,
    color: theme.properties.brown,
    paddingVertical: 0,
    lineHeight: typography.body,
    paddingLeft: FONT_BASE * 0.75,
    paddingRight: FONT_BASE * 2.25,
    fontFamily: "SN",
    fontSize: typography.body,
  },
  barIcon: {
    position: "absolute",
    right: FONT_BASE * 0.75,
  },
  sorterButton: {
    flex: 1,
    height: FONT_BASE * 2,
    backgroundColor: theme.properties.white,
    borderRadius: FONT_BASE,
    borderWidth: 0.5,
    borderColor: theme.properties.whiteBorder,
    boxShadow: theme.properties.littleShadow,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: FONT_BASE * 0.75,
    paddingRight: FONT_BASE * 2.25,
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: FONT_BASE * 0.625,
  },
  counter: {
    color: theme.properties.vibrantOrange,
  },
});
