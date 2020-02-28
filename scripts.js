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

  var myFirebase = new Firebase("https://rvrslkupdb.firebaseio.com/");
  var database = myFirebase.database();
  


  //Searchbar functions

  function navbarSearchFunct() {
    var input, filter, i;
    input = document.getElementById("navbar-search");
    filter = input.value.toUpperCase();
    list = //PLACEHOLDER_FIREBASE_FUNCTION OR read a .JSON file from firebase;
    listItem = list.getElementsByTagName("listItem");

    

    for (i = 0, i < listItem.length; i++){
      var ref = database.ref([i]);

      ref.once("value", function(snapshot) {
      YOUR_VARIABLE_HERE = snapshot.val();
      });


      item = listItem[i];
      title = item.name;
      recipe = item.form 
      ingredients = item.ingredients;

      // TODO:: Finish this function, stupid

    }


  }



  function sidebarSearchFunct() {





  }

  //Event listeners


