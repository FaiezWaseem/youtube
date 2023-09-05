import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Icon } from "react-native-elements";
import data from "../../lib";
export default function VideoItemCard({ video, navigate }) {
  return (
    <View style={{ paddingTop: 10, backgroundColor: "#1f1f1f" }}>
      <TouchableOpacity
        onPress={() => {
          navigate.push("Video", {
            video,
          });
        }}
      >
        <Image
          style={{ width: "100%", height: 200, resizeMode: "cover" }}
          source={{
            uri: video?.thumbnails?.[0]?.url,
          }}
        />
        <Text
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
            backgroundColor: "#000",
            color: "#fff",
            paddingHorizontal: 4,
          }}
        ></Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigate.push("Video", {
            video,
          });
        }}
      >
        <View
          style={{
            paddingTop: 8,
            paddingHorizontal: 10,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#383838",
          }}
        >
          <View>
            <Image
              style={{ width: 40, height: 40, borderRadius: 100 }}
              source={{
                uri: video?.channelThumbnail,
              }}
            />
          </View>
          <View style={{ flex: 1, paddingHorizontal: 10, paddingBottom: 5 }}>
            <Text style={{ color: "#fff" }}>{video?.title}</Text>
            <Text style={{ color: "#fff" }}>
              {`${video?.channelName} • ${video?.viewCount}`}
            </Text>
          </View>
          <View style={{ alignSelf: "flex-start" }}>
            <Icon name="more-vert" color={"#fff"} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
