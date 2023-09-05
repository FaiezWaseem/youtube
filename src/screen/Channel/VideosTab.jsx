import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";
import ChannelVideo from "../../components/channel/channelVideoCard";
import yt_api from "../../networkClient/yt_api";
export default ({ channelId, channelName, navigation }) => {
  const [channelvideos, setChannelvideos] = useState([]);
  useEffect(() => {
    yt_api
      .getChannelVideos(channelId)
      .then((res) => {
        let temp = res?.data;
        temp.pop();
        setChannelvideos(temp);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Tabs.FlatList
      data={channelvideos}
      renderItem={({ item }) => (
        <ChannelVideo
          video={item}
          navigate={navigation}
          channelName={channelName}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};
