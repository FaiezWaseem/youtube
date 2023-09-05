import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeActivity from "../screen/Home";
import LoginActivity from "../screen/LoginActivity";
import VideoActivity from "../screen/VideoActivity";
import ProfileActivity from "../screen/ProfileActivity";
import YoutubePlayerActivity from "../screen/VideobyId";
import SearchActivity from "../screen/SearchActivity";
import ChannelScreen from "../screen/Channel";
import ShortsActivity from "../screen/ShortsActivity";
import SettingActivity from "../screen/SettingActivity";

const Stack = createNativeStackNavigator();
export default function Route() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Channel" component={ChannelScreen} />
        <Stack.Screen name="Home" component={HomeActivity} />
        <Stack.Screen name="Video" component={VideoActivity} />
        <Stack.Screen name="Login" component={LoginActivity} />
        <Stack.Screen name="Profile" component={ProfileActivity} />
        <Stack.Screen name="Player" component={YoutubePlayerActivity} />
        <Stack.Screen name="Search" component={SearchActivity} />
        <Stack.Screen name="Shorts" component={ShortsActivity} />
        <Stack.Screen name="Setting" component={SettingActivity} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
