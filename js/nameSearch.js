let lmNamePage = 1;
let lastSearch = "0";


$('#nav-search').on('keyup', function(event) {
  var inner1 = document.getElementById("nav-search").value;
  console.log(inner1);
 
  if(event.keyCode == 13){
      document.getElementById("main-panel").innerHTML = `<div class="panel-head-wrapper" id="namehead"><h2>Search by Name:</h2></div><br><br>`;
      if(inner1.split(" ").length == 1 || inner1.split(" ").length == 2 || inner1.split(" ").length == 3 || inner1.split(" ").length == 4 ){
        console.log("The search query is: " + inner1);
          lmNamePage = 1;
          panelPurge();
          getByName(inner1, lmNamePage);
      }
  }
})

$('#nav-search2').on('keyup', function(event) {
  var inner1 = document.getElementById("nav-search2").value;
  console.log(inner1);
 
  if(event.keyCode == 13){
      document.getElementById("main-panel").innerHTML = `<div class="panel-head-wrapper" id="namehead"><h2>Search by Name:</h2></div><br><br>`;
      if(inner1.split(" ").length == 1 || inner1.split(" ").length == 2 || inner1.split(" ").length == 3 || inner1.split(" ").length == 4 ){
        console.log("The search query is: " + inner1);
          lmNamePage = 1;
          panelPurge();
          getByName(inner1, lmNamePage);
      }
  }
})



 function getByName(searchText, pageNumber) {

   let page = pageNumber;
   let search1 = searchText.trim();
   lastSearch = search1;

   var targetUrl1 = 'https://us-central1-rvrslkupdb.cloudfunctions.net/getByName?findthis=' + search1 + "&page=" + page;
      
   loadPanel(String(targetUrl1), "name", lastSearch, page);


  }