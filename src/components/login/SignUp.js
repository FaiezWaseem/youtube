import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
export default function SignUp() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  return (
    <View>
      <TextInput
        mode="outlined"
        label="Name"
        placeholder="Type your name here"
        onChangeText={(text) => setName(text)}
        value={name}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Email"
        placeholder="Type your Email here"
        onChangeText={(text) => setEmail(text)}
        value={email}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Password"
        placeholder="Type your Password here"
        onChangeText={(text) => setPass(text)}
        value={pass}
        style={styles.input}
      />
      <Button
        style={{ margin: 10 }}
        mode="contained"
        onPress={() => {
          if (name != '' && email != '' && pass != '') {
            // database.signUp(email, pass, name);
          } else {
            Alert.alert('Erorr', 'Please Fill Out all Text Fields');
          }
        }}>
        Sign-Up
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    margin: 5,
  },
});
