import * as React from 'react';
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
const styles = StyleSheet.create({
  bg: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    backgroundColor: '#1f1f1f',
  },
  headerView: {
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: { fontWeight: 'bold', fontSize: 18, marginLeft: 4, color: '#fff' },
});
export default styles;
