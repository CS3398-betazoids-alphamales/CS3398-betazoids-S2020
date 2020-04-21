'use strict';

let ingrArray = [];
let negIngrArray = [];


(function(angular){

    var allIngredients =["everclear","nails","tree bark","rum","lime juice","simple syrup","grenadine","coconut rum","melon liqueur","orange juice","pineapple juice","early times","apricot brandy","club soda","scotch","coffee liqueur","half & half","orange brandy liqueur","amaretto","vodka","cranberry juice","grapefruit juice","southern comfort","grand marnier","amaretto di saronno","gin or vodka","dry vermouth","creme de noya","white creme de menthe","blue curacao","jack daniels","7up","galliano","harveys bristol cream","dubonnet","finlandia vodka","gold tequila","triple sec","margarita mix","ice","irish cream","gin","sweet & sour mix","apple cider","lemon juice","peppermint schnapps","asti spumante wine","lemon","bourbon","pepe lopez tequila","tequila","water","salt","gold rum","banana liqueur","sloe gin","dark rum","tia maria","milk","espresso shot","cream of coconut","chocolate syrup","vanilla ice cream","creme de almond","lemonade","orange spice tea bag","canadian mist","pina colada mix","brandy","irish whiskey","coffee","sour mix","campari","sweet vermouth","dark creme de cacao","ground cinnamon","apple","apple juice","honey","apricot liqueur","cherry brandy","midori","whipped cream","bombay gin","hazelnut liqueur","banana","vanilla syrup","white creme de cacao","bar sugar","bananas","nutmeg","pureed strawberries","strawberry liqueur","pecans","peach schnapps","orange sherbet","kirsch","orange bitters","creme de noyaux","sugar","hot coffee","korbel spiced brandy","roses sweetened lime juice","limeade concentrate","beer","cinnamon stick","lemon peel","hot cider","green creme de menthe","oreo cookies","ginger ale","lime wedge","lemon wedge","pepper sauce","skyy vodka","passion fruit liqueur","peach","blueberries","raspberry liqueur","blackberry brandy","lillet","light rum","skyy citrus","tonic water","hot chocolate","cherry","chocolate chips","chocolate ice cream","bitters","black sambuca","raspberries","mentholmint schnapps","beef broth","bloody mary mix","maple syrup","tomato juice","spiced rum","plain yogurt","blueberries with juice","grape juice","korbel brandy","white creme de cocoa","vanilla extract","lime juce","creme de banana","orange pekoe tea","dark jamaica rum","tabasco sauce","salt & pepper","worcestershire sauce","iced tea","butterscotch schnapps","tuaca","sugar syrup","praline or pecan liqueur","chocolate mint liqueur","cocktail orange syrup","maraschino cherries","cloves","maraschino cherry juice","metaxa","orange wedge","cinnamon schnapps","red apple","creme de cacao","cherry 7up","brown cacao","chablis","creme de cassis","benedictine","amer picon","egg whites","maraschino cherry","champagne","granulated sugar","peychaud bitters","korbel champagne","malt","hersheys syrup","cherry liqueur","scotch liqueur","whipping cream","brown sugar","semisweet chocolate squares","creme de cocoa","dark creme de cocoa","peppermint liqueur","lime","orange","sprite","cointreau","roses lime juice","midori melon liqueur","collins mix","irish mist","lemon twist","barspoon hot buttered rum mix","liqueur","hot cappuccino","hot black coffee","liquore galliano","golden rum","strawberries","cutty sark scots whisky","cola","irish whisky","kirschwasser","peter heering","danish vodka","dark cocoa","coco lopez","cream","ushers scotch","dubonnet rouge","dairy eggnog","ground nutmeg","eggnog","blue jello","coke","almond syrup","cognac","lemonlime soda","curacao","apple juice concentrate","coffee ice cream","vanilla","orange juice concentrate","sambuca","cinnamon","red wine","b & b","oranges","green chartreuse","apple schnapps","citrus soda","pineapple ring","blackberry liqueur","anisette","pernod","jaegermeister","peaches","eagle sweetened condensed","almond extract","eggs","banana liquour","hot chocolate or chocolate syrup","hot buttered rum mix","hot apple juice","hot cranberry juice","barspoon hot buttered rum batter","cherry syrup","frangelico","hot water","cherry marnier liqueur","dried cranberries","passion nectar","orange curacao","ouzo","stolichnaya","cuervo","beefeater","coffee brandy","anisette liqueur","peach brandy","baileys irish cream","lillehammer","chambord liqueur","limeade concentrat","blueberry schnapps","port wine","pineapple","cherry pucker","strega","cranberry","oblio sambuca","coffee bean","lime sherbet","egg","madeira","angostura bitters","old forester bourbon","stawberry liqueur","strawberry","egg white","mint sprig","twist lemon","hot tea","condensed milk","chocolate liqueur","banana liqeuer","blueberry brandy","ginger beer","yukon jack","apple jack","metexa","soda","campari liquor","orgeat","hot apple cider","squirt lemon juice","peaches in syrup","peppered vodka","orange sherbert","gentleman jack","pimms cup","pineapple syrup","cranberry sauce","pink lemonade","concentrated lime juice","early times inst pussycat mix","cold water","maraschino liqueur","orange flower water","vanilla liqueur","red curacao","burgundy","cherry juice","root beer schnapps","drambuie","rye","lime sour mix","apple brandy","white tequila","sake","watermelon","red bull","orange liqueur","sweetened lime juice","bombay sapphire","limes","sour lime juice","boiling water","tea bags","light corn syrup","licor","banana korbel brandy","blackberry korbel brandy","banana daiquiri mix","citrus gatorade","sparkling water","angostura bitter","tangerine juice","cherry korbel brandy","carys pure maple syrup","citrus vodka","unsweetened tea","spearmint schnapps","bar sour","orange peel","papaya juice","tangerine liqueur","aquavit","peach nectar","cocoa","clovestudded oranges","wild turkey","rose or burgundy","slivovitz"]

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
       let exists = allIngredients.includes(self.insert);
       console.log(exists);
       if(self.positiveItems.indexOf(input) === -1  
            && self.insert !== '' && exists){
          self.positiveItems.push(input);
          self.insert = '';
          ingrArray=this.positiveItems;
       } else {
           alert("Please enter a valid ingredient");
       }
    }

    function negate(input){
        let exists = allIngredients.includes(self.insert);
        if(self.negativeItems.indexOf(input) === -1
            && self.insert !== '' && exists){
          self.negativeItems.push(input);
          self.insert = '';
          negIngrArray=this.negativeItems;
       } else {
            alert("Please enter a valid ingredient");
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

function multiSearch() {
    var targetUrl = 'https://us-central1-rvrslkupdb.cloudfunctions.net/' +
        'getByIngredientStrict?page=1&total=' + ingrArray.length;

    for (let i = 0; i < ingrArray.length; i++) {
        let ingredient = '&findthis' + [i + 1] + '=' + ingrArray[i].toString().replace(/ /g, '+');
        targetUrl = targetUrl.concat(ingredient);
    }
    console.log(targetUrl);

    var xhttp = new XMLHttpRequest();

    xhttp.open('POST', targetUrl);

    document.getElementById("main-panel").innerHTML = `<div class="panel-head-wrapper" id="homehead"></div><br><br>`;

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
                              <div class="col-lg-12">
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
                                  <div class="star-rating star-rating-modal"> ` + starRating + `
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
                for(const i in ingredientArray1){
                    var z = document.createElement('p');
                    var x = document.createTextNode(ingredientArray1[i]);
                    z.appendChild(x);
                    console.log(document.getElementById("collapse-"+ idx));
                    document.getElementById("card-body-" + idx).appendChild(z);
                }

                for(const i in ingredientArray1){
                    var j = document.createElement('p');
                    var k = document.createTextNode(ingredientArray1[i]);
                    j.appendChild(k);
                    console.log(document.getElementById("collapse-"+ idx));
                    document.getElementById("recipe-container-" + idx).appendChild(j);
                }

                for(i in procedureArray){
                  var v = document.createElement('p');
                  var w = document.createTextNode(procedureArray[i]);
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



