import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import Hyperlink from "react-native-hyperlink";
import * as Linking from "expo-linking";

export default function UploaderDetail({
  thumbnail,
  des,
  name,
  subs,
  onPress,
}) {
  const [visible, setVisible] = React.useState(false);
  return (
    <View style={{ backgroundColor: "#1f1f1f" }}>
      <TouchableOpacity onPress={onPress}>
        <UserProfile title={name} thumbnail={thumbnail} subs={subs} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          visible ? setVisible(false) : setVisible(true);
        }}
      >
        <VidDes des={des} visible={visible} />
      </TouchableOpacity>
    </View>
  );
}

const UserProfile = ({ thumbnail, title, subs }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 5,
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
          uri: thumbnail,
        }}
      />
      <View style={{ flexDirection: "column" }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}>
          {title}
        </Text>
        <Text style={{ fontSize: 14, color: "#fff" }}>{subs}</Text>
      </View>
    </View>
  );
};
const VidDes = ({ des, visible }) => {
  return (
    <View style={{ marginVertical: 10 }}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginLeft: 10 }}
      >
        <Icon name={visible ? "remove-circle" : "add-circle"} color="#fff" />
        <Text style={{ color: "#fff" }}>Description</Text>
      </View>
      {visible ? (
        <View style={{ paddingHorizontal: 5, paddingVertical: 10 }}>
          <Hyperlink
            linkStyle={{ color: "#FF0000", textDecorationLine: "underline" }}
            onPress={(url, text) => Linking.openURL(url)}
          >
            <Text style={{ color: "#fff" }}>{des}</Text>
          </Hyperlink>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};
const numberFormat = (num) =>
  num >= 1000000000000
    ? (num / 1000000000000).toFixed(1).replace(/\.0$/, "") + "T"
    : num >= 1000000000
    ? (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B"
    : num >= 1000000
    ? (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M"
    : num >= 1000
    ? (num / 1000).toFixed(1).replace(/\.0$/, "") + "K"
    : num;
