define([
  // These are path alias that we configured in our bootstrap
  'jquery',     
  'underscore', 
  'backbone',
  'bootstrap',
  'moment',
  'bootstrap_editable',
  'Models/PatientInfo',

], function($, _, Backbone,Bootstrap,Moment, Bootstrap_editable, PatientInfo){
    
    
    var PatientInfoView = Backbone.View.extend({

        initialize : function () {
            console.log("Creating patientView for element "+this.$el.selector);
            var model = new PatientInfo() //Create the model
            this.render();
        },

        render:function() {
            console.log("Rendering patient view");
            this.$el.html("<div>TESTING</div>");
        }

    });
    return PatientInfoView;
});