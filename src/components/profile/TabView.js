import * as React from 'react';
import { View, StyleSheet, Dimensions, StatusBar , Text } from 'react-native';
import { TabView, SceneMap , TabBar } from 'react-native-tab-view';
import Myvideos from './tabViews/Myvideos'
import WatchLater from './tabViews/WatchLater'
import Upload from './tabViews/Upload'

const ThirdRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} >
  <Text>Page 3</Text>
  </View>
);

const initialLayout = { width: Dimensions.get('window').width };

const renderScene = SceneMap({
  first: Myvideos,
  second: WatchLater,
  third : Upload
});
const renderTabBar = props => (
	<TabBar
    	{...props}
    	activeColor={'#000'}
    	inactiveColor={'grey'}
      style={{backgroundColor:'#fff'}}
	/>
);
export default function TabViews({nav}) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'MyVideo' , nav: nav },
    { key: 'second', title: 'WatchLater' , nav: nav },
    { key: 'third', title: 'Upload' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
   flex : 1,
   height : '100%',
  },
  scene: {
    flex: 1,
  },
});