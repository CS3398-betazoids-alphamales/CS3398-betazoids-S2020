
$('#nav-search').on('keyup', function(event) {
  var inner1 = document.getElementById("nav-search").value;
  var pageNumber = 1;
  console.log(inner1);
 
  if(event.keyCode == 13){
      navbarSearch();
      panelPurge();
      document.getElementById("nav-search").innerHTML = `<div class="panel-head-wrapper" id="namehead"><h2>Search by Name:</h2></div><br><br>`;
      if(inner1.split(" ").length == 1 || inner1.split(" ").length == 2 || inner1.split(" ").length == 3){
          getByName(inner1, pageNumber);
      }
  }
})

 function getByName(searchText, pageNumber) {

      var xhttp1 = new XMLHttpRequest();
      
      let page = pageNumber;
      let search1 = searchText.trim();

      var targetUrl1 = 'https://us-central1-rvrslkupdb.cloudfunctions.net/getByName?findthis=' + search1 + "&page=" + page;
      xhttp1.open('POST', targetUrl1);

      xhttp1.onreadystatechange = function() {

          if (this.readyState == 4 && this.status == 200) {
              var data = JSON.parse(this.responseText);
              console.log(data);
              const container1 = document.getElementById('name-search');

                  data.forEach((result, idx) => {
                  // Create card element
                  const card = document.createElement('div');
                  card.classList = 'card-body';
                  var ingredientArray2 = [];
                  var procedureArray2 = [];


                      ingredientArray2.push(Object.values(result.ingredients));
                      procedureArray2.push(Object.values(result.procedure));


                  for( i in ingredientArray2){
                  console.log("Now the ingredient array has: ");
                  console.log(ingredientArray2[i]);
                  }
                  for( i in procedureArray2){
                  console.log("Now the procedure array has: ");
                  console.log(procedureArray2[i]);
                  }

                  let resultRating = 0;
                  console.log("this is result.rating: " + result.rating);
                  if ( result.rating !== undefined){
                    console.log("set result.rating");
                    resultRating = result.rating;
                  }
                  var starRating=``;
                  for(var f = 0; f < parseInt(resultRating); f++) {
                    starRating= starRating + `<span class="fa fa-star" data-rating="` + f + `"></span>`;
                  }
                  for(var f = parseInt(resultRating)+1; f <= 5; f++) {
                    console.log("The function is working");
                    starRating= starRating + `<span class="fa fa-star-o" data-rating="` + f + `"></span>`;
                  }
                  console.log(starRating);


                  const cont =
                  `<div class="col-md-4" style="display:inline-grid">
                  <div class="card">
                    <div class="card-block" id="card-block-${idx}">
                      <img class="card-img-top" src="style/amaretto.jpg" alt="Card image" style="width:100%">
                        <div class="card-body" id="card-body-${idx}">
                          <h4 class="card-title"> ${result.name} </h4>
                          <p class="card-text"> ${result.form.type} </p>
                          <a href="#" class="btn btn-primary" onclick="document.getElementById('recipepopup-${idx}').style.display='block'">Recipe</a>
                          <div class="container">
                            <div class="row">
                              <div class="col-sm-12">
                                <div class="star-rating">` + starRating + `
                                  <input type="hidden" name="${result.name}" id="hiddenRating-${idx}" class="rating-value" value="2.56">
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                      <!-- The Recipe Modal -->
            <div id="recipepopup-${idx}" class="modal">
              <span onclick="document.getElementById('recipepopup-${idx}').style.display='none'"
            class="close" title="Close Modal">&times;</span>

              <!-- Modal Content -->
              <form class="modal-content-recipe animate" action=" # ">
                <div class="imgcontainer">
                  <img src="style/amaretto.jpg" id="drinkimg" alt="Drink" class="drink rounded">
                </div>

                <div class="title-container modal-container">
                  <h2>${result.name}</h2>
                  <h4>${result.form.type}</h4>
                </div>

                         <div class="container">
                            <div class="row">
                              <div class="col-sm-12">
                                <div class="star-rating star-rating-modal">
                                  ` + starRating + `
                                  <input type="hidden" name="${result.name}" id="hiddenRating-${idx}" class="rating-value" value="2.56">
                                </div>
                              </div>
                            </div>
                          </div>

                <div class="recipe-container modal-container" id="search-recipe-container-${idx}">
                  <h5>Ingredients:</h5>
                  
                </div>

                <div class="procedure-container modal-container" id="procedure-container-${idx}">
                           <h5>To make it:</h5>
                        
                        </div>
              </form>
            </div>

                  </div>
                  `;

          container1.innerHTML += cont;

           
                  for(i in ingredientArray2){
                    var z = document.createElement('p');
                    var x = document.createTextNode(ingredientArray2[i]);
                    z.appendChild(x);
                    document.getElementById("card-body-" + idx).appendChild(z);

                  }
                  for(i in ingredientArray2){
                    var j = document.createElement('p');
                    var k = document.createTextNode(ingredientArray2[i]);
                    j.appendChild(k);
                    document.getElementById("search-recipe-container-" + idx).appendChild(j);

                  }

                  for(i in procedureArray2){
                    var v = document.createElement('p');
                    var w = document.createTextNode(procedureArray2[i]);
                    v.appendChild(w);
                    document.getElementById("procedure-container-" + idx).appendChild(v);
                  }


                  // Append newyly created card element to the container
                  //   container.innerHTML += content;

                  })


                  // Dynamically load star rating script after all elements have been created
                  var head= document.getElementsByTagName('head')[0];
                  var script= document.createElement('script');
                  script.type= 'text/javascript';
                  script.src= 'js/rating.js';
                  head.appendChild(script);



              console.log(this.responseType);
              for (i in data){
                  console.log("working");
                var div = document.createElement("DIV");
                div.innerHTML = i;
              }
              document.getElementById("unique").innerHTML =
              this.responseText;
            //console.log(this.responseText);
          }else if (this.status){
              document.getElementById("unique").innerHTML = "Can not access: " + targetUrl 
                  + " <br /> Response: " + this.status + " " + this.responseText;
                  console.log(this.responseText);
          }else{
              document.getElementById("unique").innerHTML = "Loading... ";
          }
        };
      xhttp1.send();



  }