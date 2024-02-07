import * as React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import yt_api from "../../networkClient/yt_api";
import { ResizeMode } from "expo-av";
import VideoPlayer from "expo-video-player";
import { Box, Row, height } from "rn-faiez-components";
import { Button, Share, Linking } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';



export default function VidView({ videoFormat, videoPoster, videoID }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [qualitySelection, setqualitySelection] = React.useState([
    { label: "720p", value: "drinks" },
    { label: "360p", value: "burger" },
  ]);
  const [inFullscreen, setInFullsreen] = React.useState(false);
  const refVideo = React.useRef(null);

  React.useEffect(() => {
    console.log(videoID, 'VIDEO ID');
    yt_api.getVideoURL(videoID).then((res) => {
      console.log(res);
      setqualitySelection([
        { label: "720p", value: res?.[0]?.url },
        { label: "480p", value: res?.[1]?.url },
      ]);
      setValue(res?.[1].url);
    })
      .catch((error) => {
        alert('Failed To Load Video : ' + error.message);
      })
  }, []);



  return (
    <View>
      {/* <WebScrapper
        videoId={videoID}
        response={(res) => {
          console.log(res);
          setqualitySelection([
            { label: "720p", value: res?.[0]?.url },
            { label: "360p", value: res?.[1]?.url },
          ]);
          setValue(res?.[1].url);
        }}
      /> */}
      <Row>
        <Box w={'60%'} >
          <DropDownPicker
            open={open}
            items={qualitySelection}
            value={value}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setqualitySelection}
            multiple={false}
            mode="BADGE"
          />
        </Box>
        <Row w={'40%'} p={8} justifyContent={'space-between'} >

          <TouchableOpacity onPress={async () => {
            try {
              const result = await Share.share({
                message:
                  `https://www.youtube.com/watch?v=${videoID}`,
              });
              if (result.action === Share.sharedAction) {
                if (result.activityType) {
                  // shared with activity type of result.activityType
                } else {
                  // shared
                }
              } else if (result.action === Share.dismissedAction) {
                // dismissed
              }
            } catch (error) {
              Alert.alert(error.message);
            }
          }}  >
            <FontAwesome name="share" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={async () => {
            try {
              const result = await Share.share({
                message:
                  value,
              });
              if (result.action === Share.sharedAction) {
                if (result.activityType) {
                  // shared with activity type of result.activityType
                } else {
                  // shared
                }
              } else if (result.action === Share.dismissedAction) {
                // dismissed
              }
            } catch (error) {
              Alert.alert(error.message);
            }
          }}  >
            <Entypo name="share-alternative" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={async () => {
            await Linking.openURL(value);
          }}  >
            <Entypo name="download" size={24} color="white" />
          </TouchableOpacity>

        </Row>
      </Row>


      {value ? (
        <>
          <VideoPlayer
            videoProps={{
              shouldPlay: true,
              resizeMode: ResizeMode.CONTAIN,
              source: {
                uri: value,
              },
              ref: refVideo,
            }}
            fullscreen={{
              enterFullscreen: () => {
                setInFullsreen(!inFullscreen);
                refVideo.current.setStatusAsync({
                  shouldPlay: true,
                });
              },
              exitFullscreen: () => {
                setInFullsreen(!inFullscreen);
                refVideo.current.setStatusAsync({
                  shouldPlay: false,
                });
              },
              inFullscreen,
            }}
            style={{
              alignSelf: "stretch",
              height: inFullscreen ? height(100) - 80 : 220,
              backgroundColor: "#1f1f1f",
            }}
          />
        </>
      ) : (
        <View style={styles.video}>
          <Image
            style={{ height: 200, width: "100%" }}
            source={{ uri: videoPoster }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  video: {
    height: 220,
    alignSelf: "stretch",
    backgroundColor: "#1f1f1f",
  },
});
