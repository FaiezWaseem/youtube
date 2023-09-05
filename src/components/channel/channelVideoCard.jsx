import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function ChannelVideo({ video, channelName, navigate }) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        marginBottom: 5,
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
      <Thumbnail thumb={video?.thumbnails?.[0]?.url} />
      <Video_Detail
        uploader={video?.viewCount}
        title={video?.title}
        date={video?.lengthText}
      />
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
          height: 100,
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
//Video Detail
const Video_Detail = ({ date, title, uploader }) => {
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ marginBottom: 5, color: "#fff" }}>{title}</Text>
      <Text style={{ color: "#fff" }}>{uploader}</Text>
      <Text style={{ color: "#fff" }}>{date}</Text>
    </View>
  );
};
