'use strict';

let ingrArray = [];
let negIngrArray = [];
let lmMultiPage = 1;

(function(angular){

  var app = angular.module('mainModule', ['chips']);
  
  app.controller('mainController',mainController);
  
  function mainController($filter){
    let self = this;

    init();
    
    function init(){
       self.positiveItems = [];
       self.negativeItems = [];
       self.insert = '';
    }
   
    self.add = add;
    self.negate = negate;
    self.closePos = closePos;
    self.closeNeg = closeNeg;
    
   function add(input){
       if(self.positiveItems.indexOf(input) === -1  
            && self.insert !== ''){
          
          self.positiveItems.push(input);
          self.insert = '';
          ingrArray=this.positiveItems;
       } else {
         console.log('presente');
       }
    }

    function negate(input){
        if(self.negativeItems.indexOf(input) === -1
            && self.insert !== ''){
          self.negativeItems.push(input);
          self.insert = '';
          negIngrArray=this.negativeItems;
       } else {
       }
    }
    
    function closePos(text){
      self.positiveItems = $filter('filter')(self.positiveItems, function(value){
        return value != text;
      });
      ingrArray=this.positiveItems;
    }

    function closeNeg(text){
      self.negativeItems = $filter('filter')(self.negativeItems, function(value){
        return value != text;
      });
      negIngrArray=this.negativeItems;
    }
  }
  
})(window.angular);

$("#multi-search").click(function(){
	panelPurge();
	lmMultiPage = 1;
    multiSearch(lmMultiPage);
});

function multiLoadMore(){
    var element = document.getElementById("lm-container");
    element.parentNode.removeChild(element);
    lmMultiPage++;
    console.log("The page # is: " + lmMultiPage);
    multiSearch(lmMultiPage);
}

function multiSearch(lmMultiPage) {
	let page = lmMultiPage;

    var targetUrl = 'https://us-central1-rvrslkupdb.cloudfunctions.net/' +
        'getByIngredientStrict?page=' + page + '&total=' + ingrArray.length;

    for (let i = 0; i < ingrArray.length; i++) {
        let ingredient = '&findthis' + [i + 1] + '=' + ingrArray[i].toString().replace(/ /g, '+');
        targetUrl = targetUrl.concat(ingredient);
    }
    console.log(targetUrl);

    var xhttp = new XMLHttpRequest();

    xhttp.open('POST', targetUrl);

    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            console.log(data);
            const container = document.getElementById('main-panel');

            data.forEach((result, idx) => {
                // Create card element
                const card = document.createElement('div');
                card.classList = 'card-body';
                var ingredientArray1 = [];
                var procedureArray = [];

                      
                        ingredientArray1.push(Object.values(result.ingredients));
                        procedureArray.push(Object.values(result.procedure));
                      
     
                  for( i in ingredientArray1){
                  console.log("Now the ingredient array has: ");
                  console.log(ingredientArray1[i]);
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




                for(const i in ingredientArray1){
                    console.log("Now the ingredient array has: ");
                    console.log(ingredientArray1[i]);
                }

                let index = idx;

                  if (lmMultiPage > 1) {
                    for (var i = 1; i < lmMultiPage; i++) {
                      index = index + 24;
                    }
                  }

                var image = getImage(result.form.type);

                const cont =
                    `<div class="col-md-4" style="display:inline-grid">
                  <div class="card">
                    <div class="card-block" id="card-block-${index}">
                      <img class="card-img-top" src="${image}" alt="Card image" style="width:100%">
                        <div class="card-body" id="card-body-${index}">
                          <h4 class="card-title"> ${result.name} </h4>
                          <p class="card-text"> ${result.form.type} </p>
                          <a href="#" class="btn btn-primary" onclick="document.getElementById('recipepopup-${index}').style.display='block'">Recipe</a>
                          <div class="container">
                            <div class="row">
                              <div class="col-lg-12">
                                <div class="star-rating">` + starRating + `
                                  <input type="hidden" name="${result.name}" id="hiddenRating-${index}" class="rating-value" value="2.56">
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>


                    <!-- The Recipe Modal -->
                    <div id="recipepopup-${index}" class="modal">
                      <span onclick="document.getElementById('recipepopup-${index}').style.display='none'"
                    class="close" title="Close Modal">&times;</span>
  
                      <!-- Modal Content -->
                      <form class="modal-content-recipe animate" action=" # ">
                        <div class="imgcontainer">
                          <img src="${image}" id="drinkimg" alt="Drink" class="drink rounded">
                        </div>
  
                        <div class="title-container modal-container">
                          <h2>${result.name}</h2>
                          <h4>${result.form.type}</h4>
                        </div>
  
  
                           <div class="container">
                              <div class="row">
                                <div class="col-sm-12">
                                  <div class="star-rating star-rating-modal"> ` + starRating + `
                                    <input type="hidden" name="${result.name}" id="hiddenRating-${index}" class="rating-value" value="2.56">
                                  </div>
                                </div>
                              </div>
                            </div>
  
                        <div class="recipe-container modal-container" id="recipe-container-${index}">
                          <h5>Ingredients:</h5>
                          
                        </div>
  
                        <div class="procedure-container modal-container" id="procedure-container-${index}">
                          <h5>To make it:</h5>
                          
                        </div>
                      </form>
                    </div>
  
                    </div>`;



                container.innerHTML += cont;
                for(const i in ingredientArray1){
                    var z = document.createElement('p');
                    var x = document.createTextNode(ingredientArray1[i]);
                    z.appendChild(x);
                    console.log(document.getElementById("collapse-"+ index));
                    document.getElementById("card-body-" + index).appendChild(z);
                }

                for(const i in ingredientArray1){
                    var j = document.createElement('p');
                    var k = document.createTextNode(ingredientArray1[i]);
                    j.appendChild(k);
                    console.log(document.getElementById("collapse-"+ index));
                    document.getElementById("recipe-container-" + index).appendChild(j);
                }

                for(i in procedureArray){
                  var v = document.createElement('p');
                  var w = document.createTextNode(procedureArray[i]);
                  v.appendChild(w);
                  document.getElementById("procedure-container-" + index).appendChild(v);
                }

                // Append newyly created card element to the container
                //   container.innerHTML += content;

            })


			const container1 = document.getElementById('main-panel');
                  const loadMore = `<div class="container" id="lm-container">
                                        <div class="row justify-content-center">
                                            <div class="col-lg-8 text-center">
                                              <a href="#" class="btn btn-primary load-more" onclick="multiLoadMore()">Load More</a>
                                            </div>
                                        </div>
                                    </div>`;
                  container1.innerHTML += loadMore;


            // Dynamically load star rating script after all elements have been created

            var head= document.getElementsByTagName('head')[0];
            var script= document.createElement('script');
            script.type= 'text/javascript';
            script.src= 'js/rating.js';
            head.appendChild(script);


            console.log(this.responseType);
            for (const i in data){
                console.log("working");
                var div = document.createElement("DIV");
                div.innerHTML = i;
            }
            document.getElementById("unique").innerHTML =
                this.responseText;
            //console.log(this.responseText);
        }else if (this.status){
           
            console.log(this.responseText);
        }else{
            document.getElementById("unique").innerHTML = "Loading... ";
        }
    };
    xhttp.send();
}



