import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function Recomendation({ video, navigate }) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "column",
        marginBottom: 5,
        backgroundColor: "#383838",
      }}
      onPress={() => {
        navigate.push("Video", {
          video,
        });
      }}
    >
      <Thumbnail
        thumb={video?.thumbnails?.[video?.thumbnails?.length - 1].url}
      />
      <Video_Detail
        uploader={video?.channelName}
        title={video?.title}
        date={video?.snippet?.publishTime}
      />
    </TouchableOpacity>
  );
}
//Thumbnail
const Thumbnail = ({ thumb }) => {
  return (
    <View>
      <Image
        style={{ width: "100%", height: 220, marginHorizontal: 6 }}
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
