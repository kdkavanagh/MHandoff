define([
        'jquery',     
        'underscore', 
        'backbone',
        'bootstrap',
        'Models/Patient',
        'text!Views/templates/dashboardTile.html',
        ], function($, _, Backbone,Bootstrap, Patient, dashboardTile){

    var DashboardTileView = Backbone.View.extend({        

        events : {
            "click div#patientInfoArea" : "openPatient",
        },
        
        initialize:function(options) {
            this.options = options || {};
            this.patientModel = options.patientModel;
            this.gridster = this.options.gridster;
            this.template = dashboardTile;
        },

        render : function() {
            var tmpl = _.template(this.template); //tmpl is a function that takes a JSON and returns html
            console.log(this.patientModel.toJSON());
            this.setElement(tmpl(this.patientModel.toJSON()));
            this.gridster.add_widget(this.el);
        },   
        
        openPatient : function() {
            this.trigger('patientOpenRequest', this.patientModel);
        },

    });


    return DashboardTileView;
});