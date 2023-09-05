import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import yt_api from "../../networkClient/yt_api";

const Header = ({ channelFollowers, channelId, channelName }) => {
  const [channelInfo, setChannelInfo] = useState({
    avatar: [],
    mobileBanner: [],
  });

  useEffect(() => {
    yt_api
      .getChannelMetaInfo(channelId)
      .then((res) => {
        if (res.status == 200) {
          setChannelInfo(res?.data);
        }
      })
      .catch((err) => console.warn(err));
  }, []);
  return (
    <View style={{ backgroundColor: "#1F1F1F" }}>
      <Image
        source={{ uri: channelInfo?.mobileBanner?.[2]?.url }}
        style={styles.cover}
        resizeMode="stretch"
      />
      <Image
        style={styles.channelAvtar}
        source={{ uri: channelInfo?.avatar?.[2]?.url }}
      />
      <Text style={styles.channelName}>{channelInfo?.title}</Text>

      <View style={styles.channelDescription}>
        <Description
          head={channelFollowers?.split(" ")[0]}
          title="Subscriber"
        />
        <Text style={styles.divider}>|</Text>
        <Description head={channelInfo?.videosCount} title="Videos" />
        <Text style={styles.divider}>|</Text>
        <Description head={`${new Date().getFullYear()}`} title="Joined on" />
      </View>
      <Pressable
        style={styles.channelDescription}
        onPress={() =>
          navigation?.navigate("ChannelScreen", {
            screen: "PlayList",
          })
        }
      >
        <Text numberOfLines={2} style={styles?.description}>
          {channelInfo?.description}
        </Text>
        <Icon name="chevron-forward-outline" size={28} color="#fff" />
      </Pressable>
    </View>
  );
};
const Description = (props) => {
  const { icon, count } = props;
  return (
    <View style={styles.descView}>
      {icon && <Icon name={icon} size={26} color="#fff" />}
      {count ? (
        <Text style={styles.descHead}>{numberSeperator(count)}</Text>
      ) : count === 0 ? (
        <Text style={styles.descHead}>{numberSeperator(count)}</Text>
      ) : (
        <Text style={styles.descHead}>{props?.head}</Text>
      )}
      <Text style={styles.descTitle}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  option: {
    marginHorizontal: 12,
    marginVertical: 9,
  },
  optionText: {
    fontFamily: "Roboto-Light",
    fontSize: 18,
    color: "#040201",
  },
  cover: {
    width: "100%",
    height: 130,
  },
  channelAvtar: {
    marginVertical: 12,
    alignSelf: "center",
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
  },
  channelName: {
    fontFamily: "Roboto-Black",
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    letterSpacing: 0.23,
  },
  followButton: {
    alignSelf: "center",
    marginVertical: 4,
  },
  buttonText: {
    fontFamily: "Roboto-Medium",
    fontSize: 18,
    letterSpacing: 0.29,
    color: "#929292",
  },
  channelDescription: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 4,
  },
  divider: {
    fontFamily: "Roboto-Light",
    fontSize: 33,
    color: "#929292",
    marginHorizontal: 5,
  },
  descHead: {
    fontFamily: "Roboto-Medium",
    fontSize: 15,
    color: "#fff",
  },
  descView: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  descTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 13.7,
    color: "#929292",
  },
  description: {
    fontFamily: "Roboto-Medium",
    fontSize: 13,
    letterSpacing: 0.17,
    textAlign: "center",
    width: "85%",
    alignSelf: "center",
    color: "#929292",
  },
  heading: {
    fontFamily: "Roboto-Black",
    color: "#040201",
    fontSize: 16,
    margin: 8,
  },
  thumbnail: {
    width: "45%",
    height: 100,
    borderRadius: 8,
  },
  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
    marginHorizontal: 10,
    alignItems: "center",
    width: "48%",
  },

  videoTitle: {
    color: "#fff",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    letterSpacing: 0.1,
    width: "100%",
  },
  titleContainer: {
    flexDirection: "column",
    width: "80%",
  },
  videoDescription: {
    color: "#9c9c9c",
    fontFamily: "Roboto-Medium",
    fontSize: 12,
  },
  videoContainer: {
    flexDirection: "row",
    marginHorizontal: 8,
    marginVertical: 4,
    width: "100%",
    alignItems: "flex-start",
  },
  listFooter: {
    height: 30,
  },
});

export default Header;
