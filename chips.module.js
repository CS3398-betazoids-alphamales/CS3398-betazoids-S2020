'use strict';

(function(angular){

  var _template =  'chips.html';

  var app = angular.module('chips', ['ui.bootstrap']);
  
  app.component('blChips',{
      
      restrict: 'E',
      bindings: {
        text: '@',
        close: '&'
      },
      templateUrl: _template,
      controller: ChipsController,
      controllerAs: 'c'
    });
  
  
  function ChipsController(){
    var self = this;
    
    self.$onInit = init;
    
    function init(){}
    
  }
  
})(window.angular);