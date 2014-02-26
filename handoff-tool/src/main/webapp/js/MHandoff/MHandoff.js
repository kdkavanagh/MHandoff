define([
  'jquery',
  'underscore',
  'backbone',
  'router', // Request router.js
], function($, _, Backbone, Router){
    
    
    var priorityLevels = {};
    var taskStatuses={};
    var handoffUsers={};

  var initialize = function(){
    // Pass in our Router module and call it's initialize function
      _.template.formatdate = function (stamp) {
          return moment(stamp *1000).format('MMM Do YYYY, h:mm A');
      };
      _.template.getPriorityStringFromCode = function (code) {
          return priorityLevels[code];
      };
      
      _.template.getTaskStatusStringFromCode = function (code) {
          return taskStatuses[code];
      };
      _.template.getUser = function(user) {
          return handoffUsers[user];
      };
      
      $.getJSON("/backchannel/pull.do", function(data){
          //Load the priority levels 
          //Have to use for loop since we export a pointer to the priorityLevel obj and we cant change that
          for( var key in data.priorityLevels )
              priorityLevels[ key ] = data.priorityLevels[ key ];
          
          for( var key in data.taskStatuses )
              taskStatuses[ key ] = data.taskStatuses[ key ];

          for( var key in data.handoffUsers )
              handoffUsers[ key ] = data.handoffUsers[ key ];

          
          Router.initialize();
      });
      
      
    
  };

  return {
    initialize: initialize,
    priorityLevels:priorityLevels,
    taskStatuses:taskStatuses,
    handoffUsers:handoffUsers,
  };
});