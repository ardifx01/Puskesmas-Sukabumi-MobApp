import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <Text>This is historyScreens</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
