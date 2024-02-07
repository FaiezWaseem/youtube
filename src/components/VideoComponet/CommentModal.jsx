import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-paper";
import { Icon } from "react-native-elements";
import { EvilIcons } from "@expo/vector-icons";
import Hyperlink from "react-native-hyperlink";
import * as Linking from "expo-linking";
import YtApi from "../../networkClient/yt_api";
export default function CommentModal({
  commentToken,
  isCustomView,
  isShown,
  navigation,
}) {
  const [value, setValue] = React.useState("");
  const [visible, setvisible] = React.useState(false);
  const [user, setUser] = React.useState(false);
  const [profile, setProfile] = React.useState("");
  const [homeVideos, setHomeVideos] = React.useState([]);
  const [nextToken, setNextToken] = React.useState(null);
  const [isVisible, setVisible] = React.useState(true);
  React.useEffect(() => {
    loadNext(commentToken);
  }, []);

  function loadNext(token) {
    setVisible(true);
    YtApi.getComments(token).then((res) => {
      if (res?.data?.comments.length > 0) {
        setHomeVideos([...homeVideos, ...res?.data?.comments]);
        setNextToken(res?.data?.nextToken);
        setVisible(false);
      }
      setVisible(false);
    });
  }

  React.useEffect(() => {
    if (isCustomView) {
      setvisible(isShown);
    }
  }, [isShown]);

  return (
    <View style={{ backgroundColor: "#1f1f1f" }}>
      {!isCustomView && (
        <TouchableOpacity
          style={{
            marginHorizontal: 10,
            marginVertical: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 5,
          }}
          onPress={() => {
            setvisible(true);
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
            {homeVideos?.length + " "}
            Comments
          </Text>
          <Icon name="toggle-down" type="font-awesome" color="#fff" />
        </TouchableOpacity>
      )}
      {
        // Modal
      }
      <Modal
        visible={visible}
        onRequestClose={() => {
          setvisible(false);
        }}
        animationType="slide"
        transparent={true}
      >
        <SafeAreaView
          style={{ backgroundColor: "#1f1f1f", marginTop: 280, flex: 1 }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "stretch",
              backgroundColor: "#1f1f1f",
            }}
          >
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 100,
                marginHorizontal: 6,
              }}
              source={{
                uri: user ? profile : "https://robohash.org/hicveldicta.png",
              }}
            />
            <TextInput
              mode="outlined"
              label="Comment"
              placeholder="Type your thoughts here"
              onChangeText={(text) => setValue(text)}
              value={value}
              disabled={!user}
              style={{ alignSelf: "stretch", flex: 1 }}
            />
            <Icon
              name="send"
              color="#fff"
              size={34}
              style={{ fontSize: 36, marginHorizontal: 10 }}
              onPress={() => {
                Alert.alert(
                  "ALert",
                  "You need To Be logged-in Before using this functionality Thank-you"
                );
              }}
            />
          </View>
          <FlatList
            data={homeVideos}
            renderItem={({ item }) => (
              <CommentItem comment={item} navigation={navigation} />
            )}
            onEndReached={({ distanceFromEnd }) => {
              if (distanceFromEnd < 0) return;
              if (nextToken && !isVisible) {
                loadNext(nextToken);
              }
            }}
            keyExtractor={(item, i) => i.toString()}
        
          />
          {isVisible && <ActivityIndicator color={'white'} size={22} />}
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const CommentItem = ({ comment, navigation }) => {
  const [nextReplyToken, setNextReplyToken] = React.useState(null);
  const [replies, setReplies] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("REPLYs");

  const loadNextComment = () => {
    console.log(comment);
    if (nextReplyToken) {
      setLoading(true);
      YtApi.getReplyComments(nextReplyToken).then((res) => {
        setMessage(" Load More");
        setLoading(false);
        setReplies([...replies, ...res?.data?.comments]);
        setNextReplyToken(res?.data?.nextToken);
      });
    } else {
      setMessage(" REPLYs");
    }
  };

  useEffect(() => {
    setNextReplyToken(comment?.nextReplyToken);
  }, []);

  return (
    <View
      style={{
        marginVertical: 5,
        marginLeft: 5,
        flexDirection: "row",
        marginHorizontal: 5,
      }}
    >
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Channel", {
              channelId: comment?.AuthorChannelId,
              channelName: comment?.Author,
              channelFollowers: "0 Subscriber",
            });
          }}
        >
          <Image
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
              marginHorizontal: 6,
            }}
            source={{
              uri: comment?.AuthorThumbnail?.[1]?.url,
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ marginHorizontal: 5, flex: 1, maxWidth: "100%" }}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Channel", {
                channelId: comment?.AuthorChannelId,
                channelName: comment?.Author,
                channelFollowers: "0 Subscriber",
              });
            }}
          >
            <Text style={{ color: "orange", fontWeight: "bold" }}>
              {comment?.Author}
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              flex: 1,
              flexWrap: "wrap",
              color: "grey",
              fontStyle: "italic",
              marginLeft: 5,
            }}
          >
            {comment?.publishedAt}
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginVertical: 5 }}>
          <Hyperlink
            linkStyle={{ color: "#FF0000", textDecorationLine: "underline" }}
            onPress={(url, text) => Linking.openURL(url)}
          >
            <Text style={{ flex: 1, flexWrap: "wrap", color: "#fff" }}>
              {comment?.message.map((m) => m.text + " ")}
            </Text>
          </Hyperlink>
        </View>
        <View style={{ flexDirection: "row" }}>
          <EvilIcons name="like" size={24} color="#fff" />
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            {"  " + comment?.likes}{" "}
          </Text>
        </View>
        <View>
          {replies.map((item) => (
            <ReplyComment replyComment={item} key={item?.commentId} />
          ))}
        </View>
        {isLoading && <ActivityIndicator size={22} color={"#fff"} />}
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={loadNextComment}>
            <Text
              style={{
                color: "purple",
                fontWeight: "bold",
                padding: 6,
                borderWidth: 1,
                borderColor: "purple",
              }}
            >
              {comment?.replyCount} {message}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const ReplyComment = ({ replyComment }) => {
  return (
    <View
      style={{
        marginVertical: 5,
        marginLeft: 5,
        flexDirection: "row",
        marginHorizontal: 5,
      }}
    >
      <View>
        <Image
          style={{
            width: 30,
            height: 30,
            borderRadius: 100,
            marginHorizontal: 6,
          }}
          source={{
            uri: replyComment?.AuthorThumbnail?.[1]?.url,
          }}
        />
      </View>
      <View style={{ marginHorizontal: 5, flex: 1, maxWidth: "100%" }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "orange", fontWeight: "bold" }}>
            {replyComment?.Author}
          </Text>
          <Text
            style={{
              flex: 1,
              flexWrap: "wrap",
              color: "grey",
              fontStyle: "italic",
              marginLeft: 5,
            }}
          >
            {replyComment?.publishedAt}
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginVertical: 5 }}>
          <Hyperlink
            linkStyle={{ color: "#FF0000", textDecorationLine: "underline" }}
            onPress={(url, text) => Linking.openURL(url)}
          >
            <Text style={{ flex: 1, flexWrap: "wrap", color: "#fff" }}>
              {replyComment?.message.map((m) => m.text + " ")}
            </Text>
          </Hyperlink>
        </View>
        <View style={{ flexDirection: "row" }}>
          <EvilIcons name="like" size={24} color="#fff" />
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            {"  " + replyComment?.likes}{" "}
          </Text>
        </View>
      </View>
    </View>
  );
};
