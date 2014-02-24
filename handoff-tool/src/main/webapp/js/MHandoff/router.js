define([
  'jquery',
  'underscore',
  'backbone',
  'Views/NoteGridView'
], function($, _, Backbone, NoteGridView){
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
     

      // Default
      '*actions': 'defaultAction'
    }
  });

  var initialize = function(){
      console.log("Initing router");
    var app_router = new AppRouter();
    var noteGrid = new NoteGridView();
//    app_router.on('defaultAction', function(actions){
//      // We have no matching route, lets just log what the URL was
//      console.log('No route:', actions);
//      var noteGrid = new NoteGridView();
//    });
    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});