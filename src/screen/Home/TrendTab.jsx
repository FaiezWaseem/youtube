import { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import VideoItemCard from "../../components/home/VideoItemCard";
import YtApi from "../../networkClient/yt_api";

export default function TrendTab({ extraData }) {
  const [homeVideos, setHomeVideos] = useState([]);
  useEffect(() => {
    YtApi.getRecommendedVideos()
      .then((res) => {
        if (res.status == 200) {
          setHomeVideos(res.data.videos);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <ScrollView>
      {homeVideos.map((video, i) => (
        <VideoItemCard video={video} navigate={extraData} key={i} />
      ))}
      <View style={{ height: 20 }}></View>
    </ScrollView>
  );
}
