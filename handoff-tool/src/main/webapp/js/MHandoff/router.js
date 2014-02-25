define([
        'jquery',
        'underscore',
        'backbone',
        'gridster',
        'Views/PatientMasterView',

        ], function($, _, Backbone,Gridster,PatientMasterView){
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
        var view = new PatientMasterView({patientId:"kyle"}).render();
        
        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});