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


                      ingredientArray1.push(Object.values(result.ingredients));


                  for( i in ingredientArray1){
                  console.log("Now the ingredient array has: ");
                  console.log(ingredientArray1[i]);
                  }
                  const cont =
                  `<div class="col-md-4" style="display:inline-grid">
                  <div class="card">
                    <div class="card-block" id="card-block-${idx}">
                      <img class="card-img-top" src="style/amaretto.jpg" alt="Card image" style="width:100%">
                        <div class="card-body" id="card-body-${idx}">
                          <h4 class="card-title"> ${result.name} </h4>
                          <p class="card-text"> ${result.form.type} </p>
                          <a href="#" class="btn btn-primary stretched-link" onclick="document.getElementById('recipepopup-${idx}').style.display='block'">Recipe</a>
                          <img src="style/5star.png" class="rating">
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

                      <div class="title-container">
                        <h2>${result.name}</h2>
                      </div>

                      <div class="rating-container">
                        <img src="style/5star.png" class="rating">
                      </div>

                      <div class="recipe-container" id="recipe-container-${idx}">
                        <h4>${result.form.type}</h4>
                        
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

                  // Append newyly created card element to the container
                  //   container.innerHTML += content;

                  })
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

