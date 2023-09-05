import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import Header from "../../components/home/Header";
import TrendTab from "./TrendTab";
import HomeTab from "./HomeTab";
import { AntDesign } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function HomeActivity({ navigation }) {
  return (
    <>
      <Header navigation={navigation} />
      <TabBtm navigation={navigation} />
    </>
  );
}

function TabBtm({ navigation }) {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "red",
          inactiveTintColor: "#555",
        }}
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#121212",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="home" size={24} color={color} />
            ),
          }}
        >
          {(props) => <HomeTab {...props} extraData={navigation} />}
        </Tab.Screen>

        <Tab.Screen
          name="Trend"
          options={{
            tabBarBadge: 3,
            tabBarIcon: ({ color, size }) => (
              <Icon name="video-library" color={color} />
            ),
          }}
        >
          {(props) => <TrendTab {...props} extraData={navigation} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

//Header  done
//List of Videos  done
//Tab Navigation done
