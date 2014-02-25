define([
  // These are path alias that we configured in our bootstrap
  'jquery',     
  'underscore', 
  'backbone',
  'bootstrap',
  'moment',
  'bootstrap_editable',
  'Models/Patient',
  "Collections/PatientCollection",

], function($, _, Backbone,Bootstrap,Moment, Bootstrap_editable, Patient, PatientCollection){
    
    
    var PatientModalView = Backbone.View.extend({

        events : {
                      
        },

        initialize : function (options) {
            _.bindAll(this, 'render');

            this.render();
        },

        render:function() {
            $(this.el).append("<li>TESTING</li>");
        }

    });
    return PatientModalView;
});