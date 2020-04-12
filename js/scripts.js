
document.addEventListener( "DOMContentLoaded", getHome(), false );
document.addEventListener('DOMContentLoaded', function() {
      var firebaseConfig = {
            apiKey: "AIzaSyArwkzp5Fo5C3NHI3RAJWG6D6xlzhlTxGo",
            authDomain: "rvrslkupdb.firebaseapp.com",
            databaseURL: "https://rvrslkupdb.firebaseio.com",
            projectId: "rvrslkupdb",
            storageBucket: "rvrslkupdb.appspot.com",
            messagingSenderId: "332925524075",
            appId: "1:332925524075:web:e0c448b953cd7963c6792e",
            measurementId: "G-ZD50MRM92Y"
          };
          // Initialize Firebase
          firebase.initializeApp(firebaseConfig);
          firebase.analytics();

      try {
        let app = firebase.app();
       
      } catch (e) {
        console.error(e);
        
      }
    });

//These open the scrollable panels, which still need to be styled.
$("#homelink").click(function(){
  $("#ingredient-search").hide();
  $("#about").hide();
  $("#services").hide();
  $("#name-search").hide();
  $("#browse").hide();
  $("#alcohol").hide();
  $("#juices").hide();
  $("#fruit").hide();
  $("#other").hide();
  $("#favorites").hide();
  $("#home").show();
  getHome();
});

$("#browselink").click(function(){
  $("#ingredient-search").hide();
  $("#about").hide();
  $("#services").hide();
  $("#name-search").hide();
  $("#alcohol").hide();
  $("#juices").hide();
  $("#fruit").hide();
  $("#other").hide();
  $("#favorites").hide();
  $("#home").hide();
  $("#browse").show();
});

$("#aboutlink").click(function(){
  $("#ingredient-search").hide();
  $("#services").hide();
  $("#name-search").hide();
  $("#browse").hide();
  $("#alcohol").hide();
  $("#juices").hide();
  $("#fruit").hide();
  $("#other").hide();
  $("#favorites").hide();
  $("#home").hide();
  $("#about").show();
});

$("#serviceslink").click(function(){
  $("#ingredient-search").hide();
  $("#name-search").hide();
  $("#browse").hide();
  $("#alcohol").hide();
  $("#juices").hide();
  $("#fruit").hide();
  $("#other").hide();
  $("#favorites").hide();
  $("#home").hide();
  $("#about").hide();
  $("#services").show();
});


$("#alcohollink").click(function(){
  $("#ingredient-search").hide();
  $("#name-search").hide();
  $("#browse").hide();
  $("#juices").hide();
  $("#fruit").hide();
  $("#other").hide();
  $("#favorites").hide();
  $("#services").hide();
  $("#home").hide();
  $("#about").hide();
  $("#alcohol").show();
});

$("#juiceslink").click(function(){
  $("#ingredient-search").hide();
  $("#name-search").hide();
  $("#browse").hide();
  $("#fruit").hide();
  $("#other").hide();
  $("#favorites").hide();
  $("#home").hide();
  $("#about").hide();
  $("#services").hide();
  $("#alcohol").hide();
  $("#juices").show();
});

$("#fruitlink").click(function(){
  $("#ingredient-search").hide();
  $("#name-search").hide();
  $("#browse").hide();
  $("#other").hide();
  $("#favorites").hide();
  $("#home").hide();
  $("#about").hide();
  $("#services").hide();
  $("#alcohol").hide();
  $("#juices").hide();
  $("#fruit").show();
});

$("#otherlink").click(function(){
  $("#ingredient-search").hide();
  $("#name-search").hide();
  $("#browse").hide();
  $("#favorites").hide();
  $("#services").hide();
  $("#home").hide();
  $("#about").hide();
  $("#alcohol").hide();
  $("#juices").hide();
  $("#fruit").hide();
  $("#other").show();
});

$("#favlink").click(function(){
  $("#ingredient-search").hide();
  $("#name-search").hide();
  $("#browse").hide();
  $("#services").hide();
  $("#home").hide();
  $("#about").hide();
  $("#alcohol").hide();
  $("#juices").hide();
  $("#fruit").hide();
  $("#other").hide();
  $("#favorites").show();
});

$("#search-ingredient-button").click(function(){
    var inner = document.getElementById("sidebar-search").value;
    console.log(inner);

      sidebarSearch();
      document.getElementById("ingredient-search").innerHTML = ``;
      document.getElementById("ingredient-search").innerHTML = `<div class="panel-head-wrapper" id="ingredienthead"><h2>Search by Ingredient:</h2></div><br><br>`;
      if(inner.split(" ").length == 1 || inner.split(" ").length == 2 || inner.split(" ").length == 3){
          getByIngredient(inner);
      }
});

$("#search-cocktail-button").click(function(){
    var inner = document.getElementById("nav-search").value;
    console.log(inner);

      sidebarSearch();
      document.getElementById("name-search").innerHTML = ``;
      document.getElementById("name-search").innerHTML = `<div class="panel-head-wrapper" id="ingredienthead"><h2>Search by Ingredient:</h2></div><br><br>`;
      if(inner.split(" ").length == 1 || inner.split(" ").length == 2 || inner.split(" ").length == 3){
          getByName(inner);
      }
});


$("#sideexit").click(function(){
  document.getElementById("side-navigation").style.width = "0";
  document.getElementById("content-wrapper").style.marginLeft = "0";
  document.getElementById("content-wrapper").style.margin = "auto";
});

$("#sideopen").click(function(){
  document.getElementById("side-navigation").style.width = "280px";
  document.getElementById("content-wrapper").style.marginLeft = "230px";
});

function sidebarSearch(){
  document.getElementById("home").style.display = "none";
  document.getElementById("about").style.display = "none";
  document.getElementById("services").style.display = "none";
  document.getElementById("name-search").style.display = "none";
  document.getElementById("browse").style.display = "none";
  document.getElementById("alcohol").style.display = "none";
  document.getElementById("juices").style.display = "none";
  document.getElementById("fruit").style.display = "none";
  document.getElementById("other").style.display = "none";
  document.getElementById("favorites").style.display = "none";
  document.getElementById("ingredient-search").style.display = "block";
}

function navbarSearch(){
  document.getElementById("home").style.display = "none";
  document.getElementById("about").style.display = "none";
  document.getElementById("services").style.display = "none";
  document.getElementById("browse").style.display = "none";
  document.getElementById("alcohol").style.display = "none";
  document.getElementById("juices").style.display = "none";
  document.getElementById("fruit").style.display = "none";
  document.getElementById("other").style.display = "none";
  document.getElementById("favorites").style.display = "none";
  document.getElementById("ingredient-search").style.display = "none";
  document.getElementById("name-search").style.display = "block";
}

function panelPurge(){
  document.getElementById("home").innerHTML = ``;
  document.getElementById("ingredient-search").innerHTML = ``;
  document.getElementById("name-search").innerHTML = ``;
}



  // Get the modal
  var modal = document.getElementById('loginpopup');

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
       modal.style.display = "none";
    }
  }

    // Get the modal
  var modal1 = document.getElementById('recipepopup-01');

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal1) {
       modal1.style.display = "none";
    }
  }

