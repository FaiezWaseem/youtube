import React, { useState } from 'react';
import { View, Text, TouchableOpacity   } from 'react-native';
import { Button } from 'react-native-paper';
import SignIn from '../components/login/SignIn';
import SignUp from '../components/login/SignUp';
export default function LoginActivity({ navigation }) {
  const [activeTab, setActiveTab] = useState('Sign-In');
  const [login, setLogin] = useState(null);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          marginVertical: 12,
        }}>
        <HeaderButton
          title="Sign-In"
          activetab={activeTab}
          setactiveTab={setActiveTab}
          style={{ marginHorizontal: 15 }}
        />
        <HeaderButton
          title="Sign-Up"
          activetab={activeTab}
          setactiveTab={setActiveTab}
        />
      </View>
      {activeTab === 'Sign-In' ? <SignIn /> : <SignUp />}
      <Button
        style={{ margin: 10 }}
        mode="contained"
        onPress={() => navigation.navigate('Home')}>
        Go back To Home Page
      </Button>
    </View>
  );
}
function HeaderButton(props) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: props.activetab === props.title ? '#000' : '#fff',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 30,
      }}
      onPress={() => {
        props.setactiveTab(props.title);
      }}>
      <Text
        style={{
          color: props.activetab === props.title ? '#fff' : '#000',
          fontSize: 15,
          fontWeight: 'bold',
        }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}
