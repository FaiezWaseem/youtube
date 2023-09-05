import React from 'react'
import {Text , View , ScrollView} from 'react-native'
import database from '../../../Backend'
import VideoItemCard from '../../home/VideoItemCard'
export default function Myvideos(props){
  const nav = props.route.nav
const  [uid , setUid] = React.useState('')
const [homeVideos , setHomeVideos] = React.useState([]);
React.useEffect(()=>{
  setUid(database.getUid())
  database.on('Userposts/'+uid , function(snaphot){
 let data = {
    time : snaphot.val().time,
    key : snaphot.val().key,
    duration : snaphot.val().duration,
    profile : snaphot.val().profile,
    title : snaphot.val().title,
    thumbnail : snaphot.val().thumbnail,
    uploader : snaphot.val().username,
    view : snaphot.val().view,
    des : snaphot.val().des,
    type: snaphot.val().type
  }
  setHomeVideos(lastOrder => {
    return [
      data,
      ...lastOrder
    ]
  });
  })
}, [uid])
return <ScrollView>

 {homeVideos.map((video) => (
         <VideoItemCard video={video} navigate={nav} />
      ))}
</ScrollView>

  
}