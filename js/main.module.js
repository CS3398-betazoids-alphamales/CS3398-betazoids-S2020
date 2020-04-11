'use strict';

let ingrArray = [];

(function(angular){

  var app = angular.module('mainModule', ['chips']);
  
  app.controller('mainController',mainController);
  
  function mainController($filter){
    let self = this;

    init();
    
    function init(){
       self.items = [];
       self.insert = '';
    }
   
    self.add = add;
    self.close = close;
    
    function add(input){
       if(self.items.indexOf(input) === -1
            && self.insert !== ''){
          self.items.push(input);
          self.insert = '';
          ingrArray=this.items;
       } else {
       }
    }

    function close(text){
      self.items = $filter('filter')(self.items, function(value){
          return value != text;
      });
      ingrArray=this.items;
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
}


