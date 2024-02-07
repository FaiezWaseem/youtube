import React, { useState, useEffect } from "react";
import { ActivityIndicator} from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";
import { Text } from "rn-faiez-components";
import ChannelVideo from "../../components/channel/channelVideoCard";
import yt_api from "../../networkClient/yt_api";
export default ({ channelId, channelName, navigation }) => {
  const [channelvideos, setChannelvideos] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    yt_api
      .getChannelVideos(channelId)
      .then((res) => {
        console.log(res)
        let temp = res?.data?.videos;
        temp.pop();
        setChannelvideos(temp);
        setLoading(false);
      })
      .catch((err) => alert(err));
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
          <ActivityIndicator color={'white'} size={24} />
        ) : (
          <Text color={"#fff"}>No Content</Text>
        )
      }
    />
  );
};
