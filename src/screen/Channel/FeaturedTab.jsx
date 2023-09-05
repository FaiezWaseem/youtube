import React, { useState, useEffect } from "react";
import { Tabs } from "react-native-collapsible-tab-view";
import Recomendation from "../../components/VideoComponet/Recomendation";
import yt_api from "../../networkClient/yt_api";
import FeaturedCard from "../../components/channel/channelFeaturedCard";

export default ({ channelId, channelName, navigation }) => {
  const [homeVideos, setHomeVideos] = useState([]);
  useEffect(() => {
    yt_api
      .getChannelFeatured(channelId)
      .then((res) => {
        let temp = res?.data;
        temp.pop();
        console.log(temp);
        setHomeVideos(temp);
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
    />
  );
};
