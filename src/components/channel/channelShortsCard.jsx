import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Box, Text } from "rn-faiez-components";
export default function ShortsVideo({ video, channelName, navigate, shorts }) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        marginBottom: 5,
        marginTop: 5,
        backgroundColor: "#383838",
      }}
      onPress={() => {
        navigate.push("Shorts", {
          shorts,
        });
      }}
    >
      <Thumbnail thumb={video?.thumbnails?.[0].url} />
      <Box
        w="100%"
        position={"absolute"}
        bottom={0}
        bg={"rgba(0,0,0,0.5)"}
        pl={8}
        rounded={8}
      >
        <Text color={"#fff"}>{video?.title?.substring(0, 30) + "..."}</Text>
        <Text color={"#fff"}>{video?.viewCount}</Text>
      </Box>
    </TouchableOpacity>
  );
}
//Thumbnail
const Thumbnail = ({ thumb }) => {
  return (
    <View>
      <Image
        style={{
          width: 160,
          height: 320,
          marginHorizontal: 6,
          borderRadius: 8,
        }}
        source={{
          uri: thumb,
        }}
      />
    </View>
  );
};
