import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import styles from "../../styles/Header";
import database from "../../Backend";
import { AntDesign } from "@expo/vector-icons";
export default function Header({ navigation }) {
  return (
    <View style={styles.bg}>
      <View style={styles.headerView}>
        <Icon name="video" type="font-awesome-5" color="#FF0000" />
        <Text style={styles.title}>YouTube</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={{ marginRight: 12 }}
          onPress={() => {
            navigation.navigate("Setting");
          }}
        >
          <AntDesign name="setting" color="#fff" size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginRight: 12 }}
          onPress={() => {
            navigation.navigate("Player");
          }}
        >
          <Icon name="videocam" color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginRight: 12 }}
          onPress={() => {
            navigation.navigate("Search");
          }}
        >
          <Icon name="search" color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginRight: 14 }}
          onPress={() => {
            if (database.getUid() != null) {
              navigation.navigate("Profile");
            } else {
              navigation.navigate("Login");
            }
          }}
        >
          <AntDesign name="user" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
