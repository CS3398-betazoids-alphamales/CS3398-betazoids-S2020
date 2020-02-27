  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "secrets.api_key",
    authDomain: "rvrslkupdb.firebaseapp.com",
    databaseURL: "https://rvrslkupdb.firebaseio.com",
    projectId: "rvrslkupdb",
    storageBucket: "rvrslkupdb.appspot.com",
    messagingSenderId: "secrets.messaging_sender_id",
    appId: "secrets.app_id",
    measurementId: "secrets.measurement_id"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

// Takes database snapshot and returns an array. Needs testing and tweaking. Possibly not even necessary.
//function snapshotToArray(snapshot) {
//    var returnArr = [];

//    snapshot.forEach(function(childSnapshot) {
//       var item = childSnapshot.val();
//        item.key = childSnapshot.key;

//        returnArr.push(item);
//    });

//    return returnArr;
//};