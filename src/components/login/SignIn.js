import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
export default function SignIn() {
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');

  return (
    <View>
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
          if (email != null && pass != null) {
            // database.signIn(email , pass);
             console.log('wooo entered');
          }
          console.log(pass);
          console.log(email);
        }}>
        Sign-in
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    margin: 5,
  },
});
