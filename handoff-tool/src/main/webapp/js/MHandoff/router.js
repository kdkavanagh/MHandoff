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
        var noteGrid = new NoteGridView({el:$("#patientNotes"),gridsterID:"#noteGrid", gridsterOpts:{
            widget_margins : [ 10, 10 ],
            widget_base_dimensions : [ 240, 150 ],
            min_cols : 3,
            max_cols: this.max_cols
        }});
        var taskGrid = new NoteGridView({el:$("#patientTasks"),gridsterID:"#taskGrid", gridsterOpts:{
            widget_margins : [ 2, 2 ],
            widget_base_dimensions : [ 240, 150 ],
            min_cols : 1,
            max_cols: 1
        }});
        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});