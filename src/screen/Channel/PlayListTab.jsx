import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Box, Text } from "rn-faiez-components";
import { Tabs } from "react-native-collapsible-tab-view";
import Recomendation from "../../components/VideoComponet/Recomendation";
import yt_api from "../../networkClient/yt_api";

export default ({ channelId, navigation }) => {
  const [playlist, setPlaylist] = useState([]);
  useEffect(() => {
    yt_api
      .getChannelPlayList(channelId)
      .then((res) => {
        console.log(res);
        if (res?.data?.length > 0) {
          setPlaylist(res?.data);
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);
  return (
    <Tabs.FlatList
      contentContainerStyle={{
        backgroundColor: "#1f1f1f",
      }}
      data={playlist}
      renderItem={({ item }) => (
        <ChannelPlayListCard video={item} navigate={navigation} />
      )}
      ListEmptyComponent={
        <Box justifyContent={"center"} alignItems={"center"}>
          <Text fontSize={32} color={"#fff"}>
            No Content Available
          </Text>
        </Box>
      }
    />
  );
};

const ChannelPlayListCard = ({ video, channelName, navigate }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        marginBottom: 5,
        marginTop: 5,
        backgroundColor: "#383838",
      }}
      onPress={() => {
        navigate.push("Video", {
          video: {
            ...video,
            channelName,
          },
        });
      }}
    >
      <Image
        style={{
          width: "100%",
          height: 200,
          marginHorizontal: 6,
          borderRadius: 8,
        }}
        source={{
          uri: video?.thumbnails,
        }}
      />
      <Box
        w="100%"
        position={"absolute"}
        bottom={0}
        bg={"rgba(0,0,0,0.5)"}
        pl={8}
        rounded={8}
        ml={5}
        mr={5}
      >
        <Text color={"#fff"}>{video?.title}</Text>
        <Text color={"#fff"}>{video?.video_count} Videos</Text>
      </Box>
    </TouchableOpacity>
  );
};
