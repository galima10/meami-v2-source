import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";

export default function Splash() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Splash Screen</Text>
      <Link href="/menuTab/MenuCalendarScreen" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});

// dans la console, pour supprimer node_modules et package-lock.json dans un terminal windows : rmdir /s /q node_modules && del package-lock.json
