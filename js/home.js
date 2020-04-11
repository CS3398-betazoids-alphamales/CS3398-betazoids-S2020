function getHome(){
  document.getElementById("home").innerHTML = `<div class="panel-head-wrapper" id="homehead"><h2>Welcome to Witches' Brew!</h2></div><br><br>`;
  getRandom();
}

function getRandom() {

      
      var xhttp = new XMLHttpRequest();

      var targetUrl = 'https://us-central1-rvrslkupdb.cloudfunctions.net/getRandomList?howmany=' + 6;
      xhttp.open('POST', targetUrl);

      xhttp.onreadystatechange = function() {

          if (this.readyState == 4 && this.status == 200) {
              var data = JSON.parse(this.responseText);
              console.log(data);
              const container = document.getElementById('home');

                  data.forEach((result, idx) => {
                  // Create card element
                  const card = document.createElement('div');
                  card.classList = 'card-body';
                  var ingredientArray1 = [];
                  var procedureArray1 = [];


                      ingredientArray1.push(Object.values(result.ingredients));
                      procedureArray1.push(Object.values(result.procedure));


                  for( i in ingredientArray1){
                  console.log("Now the ingredient array has: ");
                  console.log(ingredientArray1[i]);
                  }
                  for( i in procedureArray1){
                  console.log("Now the procedure array has: ");
                  console.log(procedureArray1[i]);
                  }


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
                                <div class="star-rating">
                                  <span class="fa fa-star-o" data-rating="1"></span>
                                  <span class="fa fa-star-o" data-rating="2"></span>
                                  <span class="fa fa-star-o" data-rating="3"></span>
                                  <span class="fa fa-star-o" data-rating="4"></span>
                                  <span class="fa fa-star-o" data-rating="5"></span>
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
                                  <span class="fa fa-star-o" data-rating="1"></span>
                                  <span class="fa fa-star-o" data-rating="2"></span>
                                  <span class="fa fa-star-o" data-rating="3"></span>
                                  <span class="fa fa-star-o" data-rating="4"></span>
                                  <span class="fa fa-star-o" data-rating="5"></span>
                                  <input type="hidden" name="${result.name}" id="hiddenRating-${idx}" class="rating-value" value="2.56">
                                </div>
                              </div>
                            </div>
                          </div>

                      <div class="recipe-container modal-container" id="recipe-container-${idx}">
                        <h5>Ingredients:</h5>
                        
                      </div>

                      <div class="procedure-container modal-container" id="procedure-container-${idx}">
                        <h5>To make it:</h5>
                        
                      </div>
                    </form>
                  </div>

                  </div>`;



                  container.innerHTML += cont;
                  for(i in ingredientArray1){
                    var z = document.createElement('p');
                    var x = document.createTextNode(ingredientArray1[i]);
                    z.appendChild(x);
                    console.log(document.getElementById("collapse-"+ idx));
                    document.getElementById("card-body-" + idx).appendChild(z);
                  }

                  for(i in ingredientArray1){
                    var j = document.createElement('p');
                    var k = document.createTextNode(ingredientArray1[i]);
                    j.appendChild(k);
                    console.log(document.getElementById("collapse-"+ idx));
                    document.getElementById("recipe-container-" + idx).appendChild(j);
                  }

                  for(i in procedureArray1){
                    var v = document.createElement('p');
                    var w = document.createTextNode(procedureArray1[i]);
                    v.appendChild(w);
                    console.log(document.getElementById("collapse-"+ idx));
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
      xhttp.send();

}

