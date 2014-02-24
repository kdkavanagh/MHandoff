define([
        'jquery',
        'underscore',
        'backbone',
        'gridster',
        'Views/NoteGridView'
        ], function($, _, Backbone,Gridster, NoteGridView){
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
        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});