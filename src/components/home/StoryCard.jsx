import React from "react";
import { Box, width, Text } from "rn-faiez-components";
import { ImageBackground, ScrollView, Pressable } from "react-native";
export default ({ shorts, navigate }) => {
  return (
    <Box w={width(100)} h={310}>
      <Text color={"#fff"} fontSize={22} fontWeight={"bold"} mt={5} mb={5}>
        Shorts
      </Text>
      <ScrollView horizontal>
        {shorts.map((item, i) => (
          <Pressable
            onPress={() => {
              navigate.push("Shorts", {
                shorts,
                index: i,
              });
            }}
          >
            <ShortVideoCard short={item} />
          </Pressable>
        ))}
      </ScrollView>
    </Box>
  );
};

const ShortVideoCard = ({ short }) => {
  return (
    <Box w={width(40)} h={290} bg={"yellow"} m={5} rounded={6}>
      <ImageBackground
        source={{ uri: short?.thumbnails?.[0]?.url }}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: "flex-end",
          borderRadius: 8,
          paddingBottom: 25,
        }}
      >
        <Text color={"white"} bg={"rgba(0,0,0,0.4)"}>
          {short?.title?.substring(0, 40)}
        </Text>
        <Text color={"white"} bg={"rgba(0,0,0,0.4)"}>
          {short?.viewCount}
        </Text>
      </ImageBackground>
    </Box>
  );
};
