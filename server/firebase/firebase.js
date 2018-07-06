const firebase = require('firebase');

var config = {
    apiKey: "AIzaSyAUzy4KAVCp86ENIuBxJRP8DcAJmL1EWT0",
    authDomain: "chat-app-d0d10.firebaseapp.com",
    databaseURL: "https://chat-app-d0d10.firebaseio.com",
    projectId: "chat-app-d0d10",
    storageBucket: "chat-app-d0d10.appspot.com",
    messagingSenderId: "160501361663"
  };

firebase.initializeApp(config);

module.exports = {firebase};