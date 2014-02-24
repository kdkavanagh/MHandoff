define([
        'jquery',
        'underscore',
        'backbone',
        'gridster',
        'Collections/NoteCollection',
        'Views/NoteGridView',
        'text!Views/templates/noteTile.html',
        'text!Views/templates/taskTile.html'
        ], function($, _, Backbone,Gridster,NoteCollection, NoteGridView, noteTile, taskTile){
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
        var noteGrid = new NoteGridView({el:$("#patientNotes"),
            gridsterID:"#noteGrid", 
            tileTemplate:noteTile,
            collection:new NoteCollection(),
            gridsterOpts:{
                widget_margins : [ 10, 10 ],
                widget_base_dimensions : [ 240, 150 ],
                min_cols : 3,
                namespace:"#noteGrid"
            }});
        var taskGrid = new NoteGridView({el:$("#patientTasks"),
            gridsterID:"#taskGrid",
            tileTemplate:taskTile, 
            collection:new NoteCollection('task'),
            gridsterOpts:{
                widget_margins : [ 0, 10 ],
                widget_base_dimensions : [ 240, 150 ],
                min_cols : 1,
                max_cols: 1,
                namespace:"#taskGrid"
            }});
        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});