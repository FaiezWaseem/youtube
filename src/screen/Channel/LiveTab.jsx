import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";
import ChannelVideo from "../../components/channel/channelVideoCard";
import yt_api from "../../networkClient/yt_api";
import { Text } from "rn-faiez-components";

export default ({ channelId, channelName, navigation }) => {
  const [channelvideos, setChannelvideos] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    yt_api
      .getChannelLive(channelId)
      .then((res) => {
        let temp = res?.data?.videos;
        console.log(temp)
        setChannelvideos(temp);
        setLoading(false);
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
      ListEmptyComponent={
        isLoading ? (
          <ActivityIndicator />
        ) : (
          <Text color={"#fff"}>No Content</Text>
        )
      }
    />
  );
};
