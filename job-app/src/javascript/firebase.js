import * as firebase from 'firebase'
import testModel from './models/test'

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
  console.log(firebase, database)
}

// retrieve from firebase
// return promise object
export const getDB = () => {
  return database.ref('/').once('value')
}
// get test key
export const getTestDB = (sectionId) => {
  return database.ref(`/${sectionId}`).once('value')
}
// add test
export const addTest = (name) => {
  let key = database.ref('/').push().key
  let model = testModel(key, name, firebase.database.ServerValue.TIMESTAMP)
  console.log(key, model)
  return database.ref('/'+ key).set(model)
}