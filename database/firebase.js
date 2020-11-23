import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAhXgrDLqzOmz3SHZ9fbW9TirSp85Ey2Kw",
  authDomain: "themeal-1d262.firebaseapp.com",
  databaseURL: "https://themeal-1d262.firebaseio.com",
  projectId: "themeal-1d262",
  storageBucket: "themeal-1d262.appspot.com",
  messagingSenderId: "342092724941",
  appId: "1:342092724941:web:787155280d727f8caec784",
  measurementId: "G-KRS4363DN2",
};

// var config = {
//   databaseURL: "https://themeal-1d262.firebaseio.com/",
//   projectId: "themeal-1d262",
// };
// if (!firebase.apps.length) {
//   firebase.initializeApp(config);
// }

firebase.initializeApp(firebaseConfig);



export default firebase;
