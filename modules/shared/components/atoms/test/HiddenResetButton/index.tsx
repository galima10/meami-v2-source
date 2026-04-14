import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { resetReduxStore, insertMockData } from "@modules/shared/hooks/slice";
import { resetDb } from "@database/database";
import { useAppDispatch } from "@modules/shared/hooks/redux";
import { fetchInitialDataThunk } from "@stores/thunks/seeds";
import { fetchAllMenusThunk } from "@stores/thunks/weeklyMenu";

export default function HiddenResetButton() {
  const dispatch = useAppDispatch();
  const handleReset = async () => {
    try {
      await resetDb();
      resetReduxStore(dispatch);
      await dispatch(fetchInitialDataThunk());
      await dispatch(fetchAllMenusThunk());
      await insertMockData(dispatch);
      console.log(
      `
      -------------------------------
      Database and Redux store reset!
      -------------------------------
      `);
    } catch (err) {
      console.error("Failed to reset DB/store", err);
    }
  };

  return (
    <TouchableOpacity style={styles.hiddenButton} onPress={handleReset}>
      <Text style={{ color: "transparent" }}>Reset</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  hiddenButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    zIndex: 999,
  },
});
