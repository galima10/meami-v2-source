import { View, StyleSheet } from "react-native";
import theme from "@constants/themes";
import { FONT_BASE } from "@constants/general";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import TabButton from "../../atoms/buttons/TabButton";

export default function AppTabBar({
  state,
  descriptors,
  navigation,
  insets,
}: BottomTabBarProps) {
  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom,
          height: FONT_BASE * 5.5 + insets.bottom,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const label = descriptors[route.key].options.title ?? route.name;

        return (
          <TabButton
            key={`buttonTab-${index}`}
            isFocused={isFocused}
            text={label}
            onPress={onPress}
            icon={route.name}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.properties.beige,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: FONT_BASE * 1.5,
    boxShadow: theme.properties.bigShadow,
    borderTopWidth: 1,
    borderColor: theme.properties.beigeBorder,
  },
});
