let firebaseConfig = {
  apiKey: "AIzaSyCQzuIUunkM1HgSxxREE7Sq-M4QQ_rcEMM",
  authDomain: "slide-builder-2019.firebaseapp.com",
  databaseURL: "https://slide-builder-2019.firebaseio.com",
  projectId: "slide-builder-2019",
  storageBucket: "gs://slide-builder-2019.appspot.com",
  messagingSenderId: "630933680402",
  appId: "1:630933680402:web:eb464cd6ca92d6b9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
