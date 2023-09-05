import * as React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet , Platform } from 'react-native';
import database from '../../../Backend'
import data from '../../../lib'
export default function Upload() {
  const [uid , setUid] = React.useState('')
  const [username , setUsername] = React.useState('')
  const [profile , setProfile] = React.useState('')

React.useEffect(()=>{
setUid(database.getUid())
database.fb('users/'+database.getUid()).once('value').then(function (snapshot) {
  setUsername(snapshot.val().name)
  setProfile(snapshot.val().profile)
})
},[uid , username , profile])

function dbUpload(obj){
  const newPostKey = database.getKey();
  const res = {
   "video":obj.videoUrl,
   "thumbnail": obj.thumb,
   "gif" : obj.gifUrl,
   "title": obj.title,
   "videoSize": obj.fileSize,
   "VideoMillisec": obj.duration,
   "duration":obj.duration,
   "view": "0",
   "type": obj.type,
   "des": obj.des,
   "likes":"0",
   "uid": uid,
   "time": data.getTimeinMilli(),
   "key":newPostKey,
   "username":username,
   "profile": profile
       }
   database.fset("video/all/"+newPostKey , res)
   database.fset("video/"+obj.type+"/"+newPostKey , res)
   database.fset("Userposts/"+uid+"/"+newPostKey, res)
  }
  return (
    <WebView
      style={styles.container}
      originWhitelist={['*']}
        source={{ uri : "https://faiezwaseem.github.io/Video-Point/MobileUpload/" }}
          onMessage={(event) => {
            console.log(JSON.parse(event.nativeEvent.data))
            dbUpload(JSON.parse(event.nativeEvent.data))  
          }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',

  },
});
