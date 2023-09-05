import * as React from "react";
import { View, StatusBar } from "react-native";
import styles from "./src/styles/main";
import Route from "./src/navigation/route";
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#000"} />
      <Route />
    </View>
  );
}
