import * as firebase from 'firebase'
import userModel from './models/user'

let database
export const init = () => {
  let config = {
    apiKey: "AIzaSyA9P7D8R0aFE7X-Lw_iTxPubJhdbecIw8U",
    authDomain: "fabled-spot-115905.firebaseapp.com",
    databaseURL: "https://fabled-spot-115905.firebaseio.com",
    projectId: "fabled-spot-115905",
    storageBucket: "fabled-spot-115905.appspot.com",
    messagingSenderId: "807556958478"
  }
  firebase.initializeApp(config)
  database = firebase.database()
}

export const googleProvider = new firebase.auth.GoogleAuthProvider()

export const firebaseAuth = firebase.auth

// retrieve from firebase
// return promise object
export const getDB = () => {
  return database.ref('/').once('value')
}
// get test key
export const getUserDB = (uid) => {
  // return database.ref(`/${uid}`).once('value')
  return database.ref('/users/'+uid).once('value')
}
// add test
export const addUserDB = (uid, name, user) => {
  // let key = database.ref('/').push().key
  // let model = testModel(key, name, firebase.database.ServerValue.TIMESTAMP)
  let model = userModel(uid, name, user, firebase.database.ServerValue.TIMESTAMP)
  return database.ref('/users/'+ uid).set(model)
}

export const updateUserDB = (uid, name, user, history) => {
  let model = userModel(uid, name, user, firebase.database.ServerValue.TIMESTAMP, history)
  console.log(uid, model)
  return database.ref('/users/'+ uid).update(model)
}