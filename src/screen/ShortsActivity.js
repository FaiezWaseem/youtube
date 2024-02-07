import React, { useState, useRef, useEffect } from "react";
import { height } from "rn-faiez-components";
import { FlatList } from "react-native";
import VideoItem from "../components/VideoPlayer";

export default ({ navigation, ...props }) => {
  const { shorts } = props.route.params;
  const { index } = props.route.params;
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const ref = useRef();
  const [myshorts, setMyshorts] = useState([]);

  function array_move(arr, old_index, new_index) {
    try {
      if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
          arr.push(undefined);
        }
      }
      arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
      return arr; // for 
    } catch (error) {
      alert(error.message)
      return []
    }
  }
  useEffect(() => {
    setMyshorts(array_move(shorts, index, 0));
  }, []);

  return (
    <FlatList
      ref={ref}
      data={myshorts}
      pagingEnabled
      renderItem={({ item, index }) => (
        <VideoItem
          data={item}
          isActive={activeVideoIndex === index}
          navigation={navigation}
          activeVideoIndex={activeVideoIndex}
          indexself={index}
        />
      )}
      onScroll={(e) => {
        const index = Math.round(e.nativeEvent.contentOffset.y / height(100));
        setActiveVideoIndex(index);
      }}
    />
  );
};
