import React, { useState, useEffect } from "react";
import { Box, Text } from "rn-faiez-components";
import { Tabs } from "react-native-collapsible-tab-view";
import ShortsVideo from "../../components/channel/channelShortsCard";
import yt_api from "../../networkClient/yt_api";

export default ({ channelId, channelName, navigation }) => {
  const [channelshorts, setChannelShort] = useState([]);
  useEffect(() => {
    yt_api
      .getChannelShorts(channelId)
      .then((res) => {
        let temp = res?.data;
        temp.pop();
        setChannelShort(temp);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Tabs.FlashList
      contentContainerStyle={{
        backgroundColor: "#1f1f1f",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
      data={channelshorts}
      renderItem={({ item }) => (
        <ShortsVideo
          video={item}
          navigate={navigation}
          channelName={channelName}
          shorts={channelshorts}
        />
      )}
      numColumns={2}
      estimatedItemSize={320}
      keyExtractor={(item, index) => index.toString()}
      ListEmptyComponent={
        <Box flex justifyContent={"center"} alignItems={"center"}>
          <Text fontSize={32} color={"#fff"}>
            No Content Available
          </Text>
        </Box>
      }
    />
  );
};
