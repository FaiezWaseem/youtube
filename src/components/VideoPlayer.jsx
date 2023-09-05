import React, { useCallback, useEffect, useRef } from "react";
import {
  Animated,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Easing,
  Pressable,
} from "react-native";
import { Video } from "expo-av";
import { Dimensions, TouchableOpacity } from "react-native";
import {
  height as wheight,
  width as Wwidth,
  Loader,
} from "rn-faiez-components";
import yt_api from "../networkClient/yt_api";
import WebScrapper from "./VideoURL";
import CommentModal from "./VideoComponet/CommentModal";
import { ResizeMode } from "expo-av";
import VideoPlayer from "expo-video-player";

export const { width, height } = Dimensions.get("window");

export const getMusicNoteAnim = (animatedValue, isRotatedLeft) => {
  return {
    transform: [
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [8, -16],
        }),
      },
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -32],
        }),
      },
      {
        rotate: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", isRotatedLeft ? "-45deg" : "45deg"],
        }),
      },
    ],
    opacity: animatedValue.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: [0, 1, 0],
    }),
  };
};

export default function VideoItem({
  data,
  isActive,
  activeVideoIndex,
  indexself,
  navigation,
}) {
  const { comments, avatarUri } = data;
  const [videoInfo, setVideoInfo] = React.useState({});
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [streaming, setStreaming] = React.useState(null);
  const [isLoading, setLoading] = React.useState(true);
  const [commentToken, setCommentToken] = React.useState(null);
  const [commentVisible, setCommentVisible] = React.useState(false);

  const discAnimatedValue = useRef(new Animated.Value(0)).current;
  const musicNoteAnimatedValue1 = useRef(new Animated.Value(0)).current;
  const musicNoteAnimatedValue2 = useRef(new Animated.Value(0)).current;

  const discAnimation = {
    transform: [
      {
        rotate: discAnimatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "360deg"],
        }),
      },
    ],
  };
  const musicNoteAnimation1 = getMusicNoteAnim(musicNoteAnimatedValue1, false);
  const musicNoteAnimation2 = getMusicNoteAnim(musicNoteAnimatedValue2, true);

  const discAnimLoopRef = useRef();
  const musicAnimLoopRef = useRef();

  const triggerAnimation = useCallback(() => {
    discAnimLoopRef.current = Animated.loop(
      Animated.timing(discAnimatedValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    );
    discAnimLoopRef.current.start();
    musicAnimLoopRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(musicNoteAnimatedValue1, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(musicNoteAnimatedValue2, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ])
    );
    musicAnimLoopRef.current.start();
  }, [discAnimatedValue, musicNoteAnimatedValue1, musicNoteAnimatedValue2]);

  useEffect(() => {
    console.log(
      `Active : ${isActive} ,nextInLine : ${
        indexself - 1 === activeVideoIndex
      } , VideoId : ${data.videoId}`
    );
    if (isActive) {
      triggerAnimation();
      apicalls();
      video?.current?.setStatusAsync({
        shouldPlay: true,
      });
    } else {
      if (indexself - 1 === activeVideoIndex) {
        apicalls();
      }
      video?.current?.setStatusAsync({
        shouldPlay: false,
      });
      discAnimLoopRef.current?.stop();
      musicAnimLoopRef.current?.stop();
      discAnimatedValue?.setValue(0);
      musicNoteAnimatedValue1?.setValue(0);
      musicNoteAnimatedValue2?.setValue(0);
    }
  }, [
    isActive,
    triggerAnimation,
    discAnimatedValue,
    musicNoteAnimatedValue1,
    musicNoteAnimatedValue2,
  ]);

  const statusBarHeight = 0;

  function apicalls() {
    console.log("LOG : Layout Called");
    yt_api.getVideoInfo(data.videoId).then((res) => {
      setVideoInfo(res?.data?.video);
      setCommentToken(res?.data?.comment?.nextToken);
    });
    yt_api.getVideoURL(data.videoId).then((res) => {
      setStreaming(res?.[0]?.url);
      setLoading(false);
    });
    yt_api.getVideoLikes(data.videoId).then((res) => {
      setStatus(res);
    });
  }

  return (
    <View
      style={[styles.container, { height: wheight(100) - statusBarHeight }]}
    >
      <Loader isVisible={isLoading} />
      <StatusBar barStyle={"light-content"} />
      {/* <WebScrapper
        videoId={data.videoId}
        response={(res) => {
          setStreaming([
            { label: "720p", value: res?.[0]?.url },
            { label: "360p", value: res?.[1]?.url },
          ]);
          setLoading(false);
        }}
      /> */}
      <VideoPlayer
        errorCallback={(e) => console.log(e)}
        videoProps={{
          shouldPlay: true,
          resizeMode: ResizeMode.CONTAIN,
          usePoster: !streaming,
          posterSource: { uri: data.thumbnails?.[0]?.url },
          source: {
            uri: streaming !== null ? streaming : "",
          },
          ref: video,
          isLooping: true,
        }}
      />

      {streaming && (
        <View style={styles.bottomSection}>
          <View style={[styles.bottomLeftSection, { flexDirection: "row" }]}>
            <Image
              source={{
                uri: videoInfo?.thumbnail?.[1]?.url,
              }}
              style={styles.verticalBarIcon}
            />
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Channel", {
                    channelId: videoInfo?.channelId,
                    channelName: videoInfo?.channelTitle,
                    channelFollowers: videoInfo?.subscriber,
                  });
                }}
              >
                <Text style={styles.channelName}>
                  {videoInfo?.channelTitle + "  " + videoInfo?.subscriber}
                </Text>
              </TouchableOpacity>
              <Text style={styles.caption}>{data?.title}</Text>
            </View>
          </View>
          <View style={styles.bottomRightSection}>
            <Animated.Image
              source={{
                uri: "https://raw.githubusercontent.com/juniorforlife/tiktok-clone/master/src/assets/images/heart.png",
              }}
              style={[styles.floatingMusicNote, musicNoteAnimation1]}
            />
            <Animated.Image
              source={{
                uri: "https://raw.githubusercontent.com/juniorforlife/tiktok-clone/master/src/assets/images/floating-music-note.png",
              }}
              style={[styles.floatingMusicNote, musicNoteAnimation2]}
            />
            <Animated.Image
              source={{
                uri: "https://raw.githubusercontent.com/juniorforlife/tiktok-clone/master/src/assets/images/disc.png",
              }}
              style={[styles.musicDisc, discAnimation]}
            />
          </View>
        </View>
      )}

      {streaming && (
        <View style={styles.verticalBar}>
          <View style={[styles.verticalBarItem, styles.avatarContainer]}>
            <Image style={styles.avatar} source={{ uri: avatarUri }} />
            <View style={styles.followButton}>
              <Image
                source={{
                  uri: "https://raw.githubusercontent.com/juniorforlife/tiktok-clone/master/src/assets/images/floating-music-note.png",
                }}
                style={styles.followIcon}
              />
            </View>
          </View>
          <View style={styles.verticalBarItem}>
            <Image
              style={styles.verticalBarIcon}
              source={{
                uri: "https://raw.githubusercontent.com/juniorforlife/tiktok-clone/master/src/assets/images/heart.png",
              }}
            />
            <Text style={styles.verticalBarText}>
              {status?.likes}
              {" likes"}
            </Text>
          </View>
          <View style={styles.verticalBarItem}>
            <TouchableOpacity
              onPress={() => setCommentVisible(!commentVisible)}
            >
              <Image
                style={styles.verticalBarIcon}
                source={{
                  uri: "https://raw.githubusercontent.com/juniorforlife/tiktok-clone/master/src/assets/images/message.png",
                }}
              />
            </TouchableOpacity>
            <Text style={styles.verticalBarText}>{comments}</Text>
          </View>
          <View style={styles.verticalBarItem}>
            <Image
              style={styles.verticalBarIcon}
              source={{
                uri: "https://raw.githubusercontent.com/juniorforlife/tiktok-clone/master/src/assets/images/reply.png",
              }}
            />
            <Text style={styles.verticalBarText}>Share</Text>
          </View>
        </View>
      )}

      {commentToken && (
        <CommentModal
          isLogin={false}
          commentToken={commentToken}
          isCustomView
          isShown={commentVisible}
          navigation={navigation}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Wwidth(100),
  },
  video: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  bottomSection: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  bottomLeftSection: {
    flex: 4,
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 4,
  },
  bottomRightSection: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  channelName: {
    color: "white",
    fontWeight: "bold",
  },
  caption: {
    color: "white",
    marginVertical: 8,
  },
  musicNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  musicNameIcon: {
    width: 12,
    height: 12,
    marginRight: 8,
  },
  musicName: {
    color: "white",
  },
  musicDisc: {
    width: 40,
    height: 40,
  },
  verticalBar: {
    position: "absolute",
    right: 8,
    bottom: 72,
  },
  verticalBarItem: {
    marginBottom: 24,
    alignItems: "center",
  },
  verticalBarIcon: {
    width: 32,
    height: 32,
  },
  verticalBarText: {
    color: "white",
    marginTop: 4,
  },
  avatarContainer: {
    marginBottom: 48,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  followButton: {
    position: "absolute",
    bottom: -8,
  },
  followIcon: {
    width: 21,
    height: 21,
  },
  floatingMusicNote: {
    position: "absolute",
    right: 40,
    bottom: 16,
    width: 16,
    height: 16,
    tintColor: "white",
  },
});
