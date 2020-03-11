
$('#sidebar-search').on('keyup', function(event) {
  var inner = document.getElementById("sidebar-search").value;
  console.log(inner);

 
  if(event.keyCode == 13){
      sidebarSearch();
      document.getElementById("home").innerHTML = ``;
      document.getElementById("ingredient-search").innerHTML = `<div class="panel-head-wrapper" id="ingredienthead"><h2>Search by Ingredient:</h2></div><br><br>`;
      if(inner.split(" ").length == 1 || inner.split(" ").length == 2 || inner.split(" ").length == 3){
          getByIngredient(inner);
      }

  }

  function getByIngredient(searchText) {

      var xhttp = new XMLHttpRequest();
      
      let search = searchText.trim();

      var targetUrl = 'https://us-central1-rvrslkupdb.cloudfunctions.net/devGetByIngredient?findthis=' + searchText;
      xhttp.open('POST', targetUrl);

      xhttp.onreadystatechange = function() {

          if (this.readyState == 4 && this.status == 200) {
              var data = JSON.parse(this.responseText);
              console.log(data);
              const container = document.getElementById('ingredient-search');

                  data.forEach((result, idx) => {
                  // Create card element
                  const card = document.createElement('div');
                  card.classList = 'card-body';
                  var ingredientArray = [];


                      ingredientArray.push(Object.values(result.ingredients));


                  for( i in ingredientArray){
                  console.log("Now the ingredient array has: ");
                  console.log(ingredientArray[i]);
                  }
                  const cont =
                  `<div class="col-md-4" style="display:inline-grid">
                  <div class="card">
                    <div class="card-block" id="card-block-${idx}">
                      <img class="card-img-top" src="style/amaretto.jpg" alt="Card image" style="width:100%">
                        <div class="card-body" id="card-body-${idx}">
                          <h4 class="card-title"> ${result.name} </h4>
                          <p class="card-text"> ${result.form.type} </p>
                          <a href="#" class="btn btn-primary stretched-link">Recipe</a>
                        </div>
                      </div>
                    </div>
                  </div>`;


                  container.innerHTML += cont;
                  for(i in ingredientArray){
                    var z = document.createElement('p');
                    var x = document.createTextNode(ingredientArray[i]);
                    z.appendChild(x);
                    console.log(document.getElementById("collapse-"+ idx));
                    document.getElementById("card-body-" + idx).appendChild(z);
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

})