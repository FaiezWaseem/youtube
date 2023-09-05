import firebase from 'firebase';
import { Alert } from 'react-native';

class database {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyA0MShqb_sn7AKNkAprJNhii-pp5nZvX5U',
        authDomain: 'social-21c03.firebaseapp.com',
        databaseURL: 'https://social-21c03.firebaseio.com',
        projectId: 'social-21c03',
        storageBucket: 'social-21c03.appspot.com',
        messagingSenderId: '390423706322',
        appId: '1:390423706322:web:cdcee45db3f6f4e884cb0b',
        measurementId: 'G-J5D9XXTXEP',
      });
    }
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        //User Logged In
        this.uid = user.uid;
        console.log('logged in ', true, ' uid : ', this.uid);
      } else {
        //User not Logged In
        this.uid = '';
        console.log('logged in ', false);
      }
    });
    console.log(firebase)    
  }
  getUid() {
    // console.log(firebase.auth().currentUser)
    try {
      this.userid = firebase.auth().currentUser.uid;
      return this.userid;
    } catch (err) {
      return null;
    }
  }
  //-------------------Authentication Logic --------------------------//
  isAuthenticated(callback) {
    firebase.auth().onAuthStateChanged(callback);
  }
  signIn(email, pass) {
    const promise = firebase.auth().signInWithEmailAndPassword(email, pass);
    promise.then((e) => {
      Alert.alert('Login', 'Login SuccessFull');
    });
    promise.catch((e) => {
      Alert.alert('Error', e.message);
    });
  }
  signOut() {
    firebase.auth().signOut();
  }
  signUp(email, pass, name) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(function () {
        let userid = firebase.auth().currentUser.uid;
        database.fb('users/' + userid).set({
          name: name,
          email: email,
          pass: pass,
          uid: userid,
          profile:
            'https://firebasestorage.googleapis.com/v0/b/social-21c03.appspot.com/o/Profile%2Favatarfunction%20rand(val)%20%7Breturn%20Math.floor((Math.random()%20*%20val)%2B1)%7D.png?alt=media&token=8be82942-b513-479e-8eee-33d6746896d8',
        });
      })
      .catch(function (error) {
        Alert.alert('Error', error);
      });
  }
  //-------------------Authentication Logic done --------------------------//

  fb(path) {
    return firebase.database().ref(path);
  }
  getKey() {
    return firebase.database().ref().child('video').push().key;
  }
  update(path, callback) {
    firebase.database().ref(path).update(callback);
  }
  on(path, callback) {
    firebase.database().ref(path).on('child_added', callback);
  }
  add(path, task) {
    firebase.database().ref(path).push(task);
  }
  fset(path, task) {
    firebase.database().ref(path).set(task);
  }
  dlt(path, id) {
    firebase.database().ref(path).child(id).remove();
  }
}
export default new database();
