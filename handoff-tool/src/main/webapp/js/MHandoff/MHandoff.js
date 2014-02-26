define([
  'jquery',
  'underscore',
  'backbone',
  'router', // Request router.js
], function($, _, Backbone, Router){
    
    
    var priorityLevels = {};
    

  var initialize = function(){
    // Pass in our Router module and call it's initialize function
      $.getJSON("/backchannel/priority.do", function(data){
          //Load the priority levels 
          //Have to use for loop since we export a pointer to the priorityLevel obj and we cant change that
          for( var key in data )
              priorityLevels[ key ] = data[ key ];
          console.log(priorityLevels);

          Router.initialize();
      });
    
  };

  return {
    initialize: initialize,
    priorityLevels:priorityLevels,
  };
});