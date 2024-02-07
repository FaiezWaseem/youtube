import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import Header from "./Header";
import { Tabs, MaterialTabBar } from "react-native-collapsible-tab-view";
import FeaturedTab from "./FeaturedTab";
import VideosTab from "./VideosTab";
import PlayListTab from "./PlayListTab";
import ShortsTab from "./ShortsTab";
import LiveTab from "./LiveTab";
import AboutTab from "./AboutTab";

const tabBar = (props) => (
  <MaterialTabBar
    {...props}
    indicatorStyle={{ backgroundColor: "red" }}
    style={{ backgroundColor: "#1F1F1F" }}
    activeColor="#FFF"
    inactiveColor="#929292"
    scrollEnabled
  />
);

const ChannelScreen = ({ navigation, route }) => {
  const { channelId, channelName, channelFollowers } = route.params;
  useEffect(() => {
    console.log(channelId);
    console.log(channelName);
    console.log(channelFollowers);
  }, []);
  return (
    <View style={styles.mainContainer}>
      <Tabs.Container
        renderHeader={() => (
          <Header
            channelId={channelId}
            channelName={channelName}
            channelFollowers={channelFollowers}
          />
        )}
        lazy
        renderTabBar={tabBar}
      >
        <Tabs.Tab name="Feature">
          <FeaturedTab
            navigation={navigation}
            channelId={channelId}
            channelName={channelName}
          />
        </Tabs.Tab>
        <Tabs.Tab name="Videos">
          <VideosTab
            navigation={navigation}
            channelId={channelId}
            channelName={channelName}
          />
        </Tabs.Tab>
        <Tabs.Tab name="Shorts">
          <ShortsTab
            navigation={navigation}
            channelId={channelId}
            channelName={channelName}
          />
        </Tabs.Tab>
        <Tabs.Tab name="Live">
          <LiveTab
            navigation={navigation}
            channelId={channelId}
            channelName={channelName}
          />
        </Tabs.Tab>
        <Tabs.Tab name="PlayList">
          <PlayListTab navigation={navigation} channelId={channelId} />
        </Tabs.Tab>
        <Tabs.Tab name="About">
          <AboutTab navigation={navigation} channelId={channelId} />
        </Tabs.Tab>
      </Tabs.Container>
      <View style={styles.listFooter} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#1f1f1f",
  },
  listFooter: {
    height: 30,
  },
});

export default ChannelScreen;
