import { View, StyleSheet } from "react-native";
import { FONT_BASE } from "@constants/general";
import theme from "@constants/themes";
import { AppText } from "@modules/shared/components/primitives/AppText";
import { daysOrder } from "@constants/mappings/orders/daysOrder";
import { toCapitalize } from "@utils/toCapitalize";
import { typography } from "@constants/styles";

interface MenuCalendarContentProps {
  dayId: number;
}

export default function MenuCalendarContent({
  dayId,
}: MenuCalendarContentProps) {
  return (
    <>
      <View style={styles.titleContainer}>
        <AppText style={styles.dayTitle}>
          {toCapitalize(daysOrder[dayId])}
        </AppText>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: FONT_BASE,
    borderBottomWidth: 1,
    borderColor: theme.properties.brown,
    padding: FONT_BASE,
    width: "100%",
    alignItems: "center",
  },
  dayTitle: {
    fontSize: typography.h4,
    fontWeight: theme.properties.bold,
  },
});
