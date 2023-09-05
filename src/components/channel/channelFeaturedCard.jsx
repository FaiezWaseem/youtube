//import liraries
import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Text, Box } from "rn-faiez-components";
import { Icon } from "react-native-elements";
// create a component
const FeaturedCard = ({ video, channelName, navigation }) => {
  if (video?.content) {
    return (
      <View style={styles.container}>
        <Text
          color={"#FFF"}
          bg={"#000"}
          fontSize={22}
          fontWeight={"bold"}
          w={"100%"}
          p={8}
          mt={5}
          mb={5}
        >
          {video?.title}
        </Text>
        {video?.content.map((item, i) => {
          return (
            <Box w={"100%"} m={4} key={i}>
              <VideoItemCard
                video={item}
                navigate={navigation}
                channelName={channelName}
              />
            </Box>
          );
        })}
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1f1f1f",
  },
});
function VideoItemCard({ video, channelName, navigate }) {
  return (
    <View style={{ paddingTop: 10, backgroundColor: "#1f1f1f" }}>
      <TouchableOpacity
        onPress={() => {
          navigate.push("Video", {
            video: {
              videoId: video?.gridVideoRenderer?.videoId,
              thumbnails: video?.gridVideoRenderer?.thumbnail?.thumbnails,
              title: video?.gridVideoRenderer?.title?.simpleText,
              channelName: channelName,
            },
          });
        }}
      >
        <Image
          style={{ width: "100%", height: 200, resizeMode: "cover" }}
          source={{
            uri: video?.gridVideoRenderer?.thumbnail?.thumbnails[3]?.url,
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
          <View style={{ flex: 1, paddingHorizontal: 10, paddingBottom: 5 }}>
            <Text style={{ color: "#fff" }}>
              {video?.gridVideoRenderer?.title?.simpleText}
            </Text>
            <Text style={{ color: "#fff" }}>
              {`${channelName} • ${video?.gridVideoRenderer?.publishedTimeText?.simpleText} • ${video?.gridVideoRenderer?.shortViewCountText?.simpleText}`}
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

export default FeaturedCard;
