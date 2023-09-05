import React from "react";
import { ScrollView, View } from "react-native";
import VidView from "../components/VideoComponet/video";
import VidDetail from "../components/VideoComponet/vidDetail";
import UploaderDetail from "../components/VideoComponet/uploaderDetail";
import CommentModal from "../components/VideoComponet/CommentModal";
import Recomendation from "../components/VideoComponet/Recomendation";
import lib from "../lib";
import YtApi from "../networkClient/yt_api";
export default function VideoActivity({ route, navigation }) {
  const { type, video } = route.params;
  const [homeVideos, setHomeVideos] = React.useState([]);
  const [isLogin, setLogin] = React.useState(false);
  const [videoDetails, setVideoDetails] = React.useState({});
  const [videoInfo, setVideoInfo] = React.useState({});
  const [commentToken, setCommentToken] = React.useState(null);

  React.useEffect(() => {
    try {
      YtApi.getVideoInfo(video?.videoId).then((res) => {
        if (res.status == 200) {
          setCommentToken(res?.data?.comment?.nextToken);
          setHomeVideos(res.data.recomended);
          setVideoInfo(res?.data?.video);
        }
      });
      YtApi.getVideoLikes(video?.videoId).then((res) => {
        setVideoDetails(res);
      });
    } catch (error) {
      alert(error);
    }
  }, []);

  return (
    <View style={{ backgroundColor: "#1f1f1f", flex: 1 }}>
      <VidView
        videoID={video?.videoId}
        videoPoster={video?.thumbnails?.[0]?.url}
        videoFormat={videoInfo?.streaming}
      />

      <ScrollView>
        {
          // Video Detail
        }
        <VidDetail
          title={video?.title}
          views={videoDetails?.viewCount}
          likes={videoDetails?.likes}
          date={lib.convertTime(videoInfo?.uploadDate)}
          type={type}
          commKey={video?.videoId}
          isLogin={isLogin}
          dislikes={videoDetails?.dislikes}
        />
        <UploaderDetail
          name={video?.channelName}
          thumbnail={video?.channelThumbnail}
          des={videoInfo?.description}
          subs={videoInfo?.subscriber}
          onPress={() => {
            console.log(videoInfo);
            navigation.navigate("Channel", {
              channelId: videoInfo?.channelId,
              channelName: video?.channelName,
              channelFollowers: videoInfo?.subscriber,
            });
          }}
        />
        {commentToken && (
          <CommentModal isLogin={isLogin} commentToken={commentToken} />
        )}
        {homeVideos?.map((item, i) => (
          <Recomendation video={item} navigate={navigation} key={i} />
        ))}
      </ScrollView>
    </View>
  );
}
