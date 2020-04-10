'use strict';

(function(angular){

    let ingrArray = [];

  var app = angular.module('mainModule', ['chips']);
  
  app.controller('mainController',mainController);
  
  function mainController($filter){
    var self = this;
    
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
          // console.log('adding')
           ingrArray.push(this.items);
           // console.log(ingrArray);
       } else {
         // console.log('nope');
       }
    }
    
    function close(text){
        // console.log('removing')
      self.items = $filter('filter')(self.items, function(value){
          return value != text;
      });
      ingrArray.splice(ingrArray.indexOf(this.items), 1 );
      // console.log(ingrArray);
    }
  }
  
})(window.angular);