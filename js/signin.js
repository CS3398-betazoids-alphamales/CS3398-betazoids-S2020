
$('#login').click( function () {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      let token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      var userPhoto = result.user.photoURL;
      console.log(user);

      // Set the user's login email to associate with reviews
      localStorage.setItem('userEmail', user.email);

      //Find the login button
      var el = document.getElementById("login");
      var newEl = document.createElement("img");
      newEl.classList.add("avatar");
      newEl.style.display = "inline-block";
      newEl.style.lineHeight = "1.5"
      newEl.src = userPhoto;
      
      el.parentNode.replaceChild(newEl, el);
      //Replace
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });

});