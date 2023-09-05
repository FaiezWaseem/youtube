import React from 'react'
import {View , Text , Image ,TouchableOpacity , StyleSheet  } from  'react-native'
 import database from '../../Backend'
export default function ProfileConatiner ({navigation}){
const [username , setUsername] = React.useState('')
const [profile , setProfile] = React.useState('')
const [uid , setUid] = React.useState('')
React.useEffect(()=>{
setUid(database.getUid())
database.fb('users/'+database.getUid()).once('value').then(function (snapshot) {
  setUsername(snapshot.val().name)
  setProfile(snapshot.val().profile)
})
},[uid , username , profile])
  return (<View style={styles.card}>
       <Icon url={profile != '' ?  profile : "https://randomuser.me/api/portraits/women/46.jpg"} />
       <Username name={username} />
       <View style={{flexDirection : 'row' , justifyContent : "space-between"}}>
       <EditButton title="Edit Profile" />
       <SignOut title="Sign Out" nav={navigation} />
       </View>
  </View>) ;
}


const Icon = ({url}) =>{
  return <>
  <Image
              style={{ width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#fff',
    position : "absolute",
    top : -50
    }}
              source={{ uri: url }}
            />
  </>
}
const Username = ({name}) =>{
  return<Text style={{margin: 10 , fontSize : 28 , fontWeight : 'bold'}}>
  {name}
  </Text>
}
const EditButton =({title}) =>{
return   <TouchableOpacity style={styles.interactButton}>
                  <Text style={styles.interactButtonText}>{title}</Text>
                   </TouchableOpacity>

}
const SignOut = ({title ,nav}) =>{

  return<TouchableOpacity style={{borderColor : "#4b7bec" , borderRadius : 5 , borderWidth : 2 ,flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    margin: 5,
    padding : 4 ,
    paddingHorizontal : 8,}}  onPress={
      ()=>{
        database.signOut();
        nav.navigate('Home');
      }
    }>
                  <Text style={{fontSize : 22 , color : "#4b7bec"}}>{title}</Text>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
  interactButton: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#4b7bec',
    margin: 5,
    borderRadius: 4,
    padding : 4 ,
    paddingHorizontal : 8,
  },
  interactButtonText: {
    fontFamily: 'SSBold',
    color: '#fff',
    fontSize: 18,
    paddingVertical: 6,
  },
  card :{justifyContent : 'center' , alignItems : 'center' , height : 200 ,
   backgroundColor : "#fff" , marginTop : 50 ,
   borderTopLeftRadius : 5,
   borderTopRightRadius : 5,
   margin : 10
   }

})
