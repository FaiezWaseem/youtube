import React, { useState, useEffect } from "react";
import { Tabs } from "react-native-collapsible-tab-view";
import { Text } from "rn-faiez-components";
import { ActivityIndicator } from "react-native";
import yt_api from "../../networkClient/yt_api";
import FeaturedCard from "../../components/channel/channelFeaturedCard";

export default ({ channelId, channelName, navigation }) => {
  const [homeVideos, setHomeVideos] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    yt_api
      .getChannelFeatured(channelId)
      .then((res) => {
        let temp = res?.data;
        temp.pop();
        console.log(temp);
        setHomeVideos(temp);
        setLoading(false)
      })
      .catch((err) => console.log(res));
  }, []);
  return (
    <Tabs.FlatList
      data={homeVideos}
      renderItem={({ item }) => (
        <FeaturedCard
          video={item}
          navigation={navigation}
          channelName={channelName}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
      ListEmptyComponent={
        isLoading ? (
          <ActivityIndicator color={'white'} size={24} />
        ) : (
          <Text color={"#fff"}>No Content</Text>
        )
      }
    />
  );
};
