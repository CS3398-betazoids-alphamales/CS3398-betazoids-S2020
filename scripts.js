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
  $("favorites").hide();
  $("#services").hide();
  $("#home").show();
  getRandom();
});

$("#browselink").click(function(){
  $("#ingredient-search").hide();
  $("#about").hide();
  $("#services").hide();
  $("#name-search").hide();
  $("#browse").show();
  $("#alcohol").hide();
  $("#juices").hide();
  $("#fruit").hide();
  $("#other").hide();
  $("favorites").hide();
  $("#services").hide();
  $("#home").hide();
});

$("#aboutlink").click(function(){
  $("#ingredient-search").hide();
  $("#about").show();
  $("#services").hide();
  $("#name-search").hide();
  $("#browse").hide();
  $("#alcohol").hide();
  $("#juices").hide();
  $("#fruit").hide();
  $("#other").hide();
  $("favorites").hide();
  $("#services").hide();
  $("#home").hide();
});

