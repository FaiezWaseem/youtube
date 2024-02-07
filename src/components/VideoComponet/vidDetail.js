import React from "react";
import { View, Text } from "react-native";
import { Foundation } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

export default function VidDetail({ title, views, date, likes, dislikes }) {
  return (
    <View
      style={{
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
        borderStyle: "solid",
        marginBottom: 5,
        paddingVertical: 5,
        backgroundColor: "#1f1f1f",
      }}
    >
      <Vid_title title={title} />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Vid_metaData views={views} date={date} />
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 10,
            alignItems: "center",
          }}
        >
          <EvilIcons name="like" size={24} color="#fff" />
          <Text style={{ color: "#fff", marginRight: 10 }}>
            {NanPlaceHolder(numberFormat(Number(likes)))}
          </Text>
          <Foundation name="dislike" size={24} color="#fff" />
          <Text style={{ color: "#fff", marginLeft: 10 }}>
            {NanPlaceHolder(numberFormat(Number(dislikes)))}
          </Text>
        </View>
      </View>
    </View>
  );
}

const Vid_title = ({ title }) => {
  return (
    <View style={{ padding: 8 }}>
      <Text style={{ fontSize: 20, color: "#fff" }}>{NanPlaceHolder(title)}</Text>
    </View>
  );
};

const Vid_metaData = ({ views, date }) => {
  return (
    <View style={{ flexDirection: "row", padding: 3 }}>
      <Text style={{ marginHorizontal: 10, color: "#fff" }}>
        {NanPlaceHolder(numberFormat(Number(views)))} Views
      </Text>
      <Text style={{ color: "#fff" }}>{NanPlaceHolder(date)}</Text>
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


    function NanPlaceHolder(val) {
      console.log(val, typeof val === 'number' && isNaN(val))
      if (typeof val === 'number' && isNaN(val)) {
        return 'loading...'
      }
      if (typeof val === 'undefined') {
        return 'loading...'
      }
      return val;
    }