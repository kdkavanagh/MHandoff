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

        events:{
          "click #buttonPress": "render",           

        },

        initialize : function (options) {
            console.log("Creating patientView for element "+this.$el.selector);
            
            this.options = options || {};

            

            var model = new PatientInfo(); //Create the model
            model.fetch();  

            //model.patientInfo.on('reset', this.render, this);
            //model.patientInfo.on('change', this.render);
            //.fetch({reset:true,});
                        
            this.render();
        },

        render:function() {
            console.log("Rendering patient view");
            this.$el.html("<div>TESTING</div>");
           // this.patientInfo.each(function())
        }

    });
    return PatientInfoView;
});