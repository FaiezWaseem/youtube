import React from "react";
import { SafeAreaView } from "react-native";
import ProfileConatiner from "../components/profile/ProfileConatiner";
import TabViews from "../components/profile/TabView";

export default function ProfileActivity({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ProfileConatiner navigation={navigation} />
      <TabViews nav={navigation} />
    </SafeAreaView>
  );
}
