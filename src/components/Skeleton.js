import React from "react"
import { View ,StyleSheet , TouchableOpacity , Text } from "react-native"


export default function Skeleton(){
  return (
   <View style={{ marginTop: 10 }}>
      <TouchableOpacity>
        <View
          style={{ width: '100%', height: 200, resizeMode: 'cover' , backgroundColor : 'grey' , opacity : 0.4 }}
        ></View>
        <Text
          style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            backgroundColor: '#ddd',
            width : 50,
            paddingHorizontal: 4,
          }}
        >
        </Text>
      </TouchableOpacity>
      <View
        style={{
          paddingTop: 8,
          paddingHorizontal: 10,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View>
          <View
            style={{ width: 40, height: 40, borderRadius: 100 , backgroundColor : 'grey', opacity : 0.6 }}
          ></View>
        </View>
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <Text  style={{ width: 250, height: 15, backgroundColor : 'grey' , marginVertical : 5 , opacity : 0.6 }}></Text>
          <Text style={{ width: 130, height: 15, backgroundColor : 'grey' , opacity : 0.6 }}>
            
          </Text>
        </View>
        <View style={{ alignSelf: 'flex-start' }}>
         
        </View>
      </View>
      
    </View>
  )
}
