'use strict';

(function(angular){
  
  var app = angular.module('mainModule', ['chips']);
  
  app.controller('mainController',mainController);
  
  function mainController($filter){
    var self = this;
    
    init();
    
    function init(){
       self.items = ['test 1'];
       self.insert = '';
    }
   
    self.add = add;
    self.close = close;
    
    function add(input){
       if(self.items.indexOf(input) === -1  
            && self.insert !== ''){
          
          self.items.push(input);
          self.insert = '';
       } else {
         console.log('yo');
       }
    }
    
    function close(text){
      self.items = $filter('filter')(self.items, function(value){
        return value != text;
      });
    }
  }
  
})(window.angular);