import { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import VideoItemCard from "../../components/home/VideoItemCard";
import StoryCard from "../../components/home/StoryCard";
import YtApi from "../../networkClient/yt_api";
import { Loader, Box, Text } from "rn-faiez-components";
export default function HomeTab({ extraData }) {
  const [homeVideos, setHomeVideos] = useState([]);
  const [homeShorts, setHomeShorts] = useState([]);
  const [homeChips, setHomeChips] = useState([]);
  const [nextToken, setNextToken] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      YtApi.getRecommendedVideos()
        .then((res) => {
          setLoading(false);
          if (res.status == 200) {
            setHomeVideos(res.data?.videos);
            setHomeShorts(res?.data?.videoShorts);
            setHomeChips(res?.data?.chips);
            setNextToken(res.data?.nextToken);
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      alert(error);
    }
  }, []);

  return (
    <Box flex bg={"#323232"}>
      <Loader isVisible={loading} />
      <ScrollView
        onScroll={({ nativeEvent }) => {
          try {
            if (isCloseToBottom(nativeEvent)) {
              console.log("Reached End");
              if (!loading) {
                setLoading(true);
                YtApi.getHomeNext(nextToken)
                  .then((res) => {
                    setLoading(false);
                    if (res.status == 200) {
                      setHomeVideos([...homeVideos, ...res.data?.videos]);
                      setNextToken(res.data?.nextToken);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                    setLoading(false);
                  });
              }
            }
          } catch (error) {
            alert(error);
          }
        }}
        scrollEventThrottle={400}
      >
        <ScrollView horizontal>
          {homeChips.map((chip) => (
            <ChipButton
              chip={chip}
              onPress={(token) => {
                if (!loading) {
                  setLoading(true);
                  YtApi.getHomeNext(token)
                    .then((res) => {
                      setLoading(false);
                      if (res.status == 200) {
                        setHomeVideos([...homeVideos, ...res.data?.videos]);
                        // setNextToken(res.data?.nextToken);
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                      setLoading(false);
                    });
                }
              }}
            />
          ))}
        </ScrollView>
        {homeVideos.map((video, i) => {
          if (i == 3) {
            return <StoryCard shorts={homeShorts} navigate={extraData} />;
          } else if (video?.videoId) {
            return <VideoItemCard video={video} navigate={extraData} key={i} />;
          }
        })}
        <View style={{ height: 20 }}></View>
      </ScrollView>
    </Box>
  );
}

const ChipButton = ({ chip, onPress }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress(
          chip.chipCloudChipRenderer.navigationEndpoint.continuationCommand
            .token
        );
      }}
    >
      <Box
        mt={10}
        rounded={8}
        m={5}
        bg={chip.chipCloudChipRenderer.isSelected ? "#000" : "rgba(0,0,0,0.3)"}
        p={6}
        mb={10}
      >
        <Text color={"white"}>
          {chip.chipCloudChipRenderer.text.runs[0].text}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};
