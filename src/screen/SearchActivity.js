import * as React from "react";
import { Box, Row, Button, Loader, Text } from "rn-faiez-components";
import {
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import YtApi from "../networkClient/yt_api";
import Recomendation from "../components/VideoComponet/Recomendation";
import Storage from "../utils/AysncStorage";

export default ({ navigation }) => {
  const [isLoading, setLoading] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [homeVideos, setHomeVideos] = React.useState([]);
  const [SearchHistory, setSearchHistory] = React.useState([]);
  const [SearchHistoryVisible, setSearchHistoryVisible] = React.useState(false);
  const [nextSearchToken, setNextSearchToken] = React.useState(null);

  const SaveSearches = (search) => {
    let searchs = SearchHistory;
    searchs.push(search);
    Storage.save("user_searches", searchs, Storage.JSON);
  };
  const getSearches = async () => {
    return (await Storage.get("user_searches", Storage.JSON)) || [];
  };
  const loadVideo = () => {
    YtApi.search_query(
      encodeURIComponent(input.replace(/\s+/g, "+").toLowerCase())
    ).then((res) => {
      setLoading(false);
      SaveSearches(input);
      if (res?.status == 200) {
        setHomeVideos(res?.data?.videos);
        setNextSearchToken(res?.data?.nextSearchToken);
        console.log(res?.data?.nextSearchToken);
      }
    });
  };
  const loadNext = (token) => {
    setLoading(true);
    YtApi.loadmoreSearches(token)
      .then((res) => {
        setNextSearchToken(res?.data?.nextToken);
        setHomeVideos([...homeVideos, ...res?.data?.videos]);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.warn(err);
      });
  };
  React.useEffect(() => {
    getSearches().then((res) => {
      if (res?.length > 10) {
        return Storage.clear();
      }
      setSearchHistory(res);
    });
  }, []);

  return (
    <Box flex bg={"#1f1f1f"}>
      <Row
        p={4}
        m={8}
        e={3}
        bg={"#383838"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <TextInput
          style={{ maxWidth: "80%", color: "#fff" }}
          value={input}
          onChangeText={(text) => {
            setInput(text);
            setSearchHistoryVisible(true);
          }}
          placeholder={"Funny Movies,Comedy,Drama"}
          placeholderTextColor="#eee"
        />
        <Button
          btnOutline
          style={{
            padding: 6,
          }}
          txtStyle={{
            color: "#fff",
          }}
          onPress={() => {
            if (input.length > 3) {
              setLoading(true);
              setSearchHistoryVisible(false);
              loadVideo();
            }
          }}
        >
          search
        </Button>
      </Row>
      <ScrollView>
        {SearchHistoryVisible &&
          SearchHistory.map((text) => (
            <TouchableOpacity
              onPress={() => {
                setInput(text);
                setSearchHistoryVisible(false);
                setLoading(true);
                loadVideo();
              }}
            >
              <Text p={8} color={"#fff"}>
                {text}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
      <FlatList
        data={homeVideos}
        renderItem={({ item }) => (
          <Recomendation video={item} navigate={navigation} />
        )}
        onEndReached={({ distanceFromEnd }) => {
          if (distanceFromEnd < 0) return;
          if (nextSearchToken) {
            loadNext(nextSearchToken);
          }
        }}
      />
      {isLoading && <ActivityIndicator size={32} color={"white"} />}
    </Box>
  );
};
