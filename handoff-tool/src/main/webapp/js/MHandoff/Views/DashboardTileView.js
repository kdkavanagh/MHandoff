define([
        'jquery',     
        'underscore', 
        'backbone',
        'bootstrap',
        'isotope',
        'Models/Patient',
        'text!Views/templates/dashboardTile.html'
        ], function($, _, Backbone,Bootstrap,Isotope, Patient, dashboardTile){

    var DashboardTileView = Backbone.View.extend({        

        events : {
            "click" : "openPatient"
        },
        
        initialize:function(options) {
            this.options = options || {};
            this.patientModel = options.patientModel;
            this.template = dashboardTile;
            
        },

        render : function(isotopeObj) {
            var tmpl = _.template(this.template); //tmpl is a function that takes a JSON and returns html
            this.setElement(tmpl(this.patientModel.toJSON()));
            isotopeObj.insert(this.el);
            
        },   
        
        openPatient : function() {
            this.trigger('patientOpenRequest', this.patientModel);
        }

    });

    return DashboardTileView;
});