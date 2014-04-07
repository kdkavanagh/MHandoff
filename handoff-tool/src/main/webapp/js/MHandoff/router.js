define([
        'jquery',
        'underscore',
        'backbone',
        'Views/PatientMasterView',
        'Views/MainView',

        ], function($, _, Backbone,PatientMasterView, MainView){
    var AppRouter = Backbone.Router.extend({
        routes: {
            // Define some URL routes

            // Default
            '*actions': 'defaultAction'
        }
    });

    var initialize = function(){
        var view = new MainView().render();
        //var view = new PatientMasterView({patientId:"1"}).render();
        
        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});