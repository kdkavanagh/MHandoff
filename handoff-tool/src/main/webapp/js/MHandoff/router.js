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
        var view = new PatientMasterView({patientId:"1"}).render();
        
        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});