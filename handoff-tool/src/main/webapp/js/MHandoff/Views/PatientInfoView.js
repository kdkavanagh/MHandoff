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

        el: $('#patientInfoDetails'),
        //template : _.template($('#patientInfoDetails').html()),
        events:{
          //"click #buttonPress": "render",           

        },

        initialize : function (options) {
            console.log("Creating patientView for element "+this.$el.selector);
            
            //this.options = options || {};
            //this.patientInfoModel = this.options.patientInfoModel;
            //this.template = this.options.template;
            this.render();

            this.on('change', this.render, this);

            
            //return model;
           // this.patientInfoModel.fetch({reset:true});

            //return this;

            
            /*
            var model = new PatientInfo(); //Create the model
            model.fetch();


            model.collection.on('reset', model.render, model);

            //model.patientInfo.on('change', this.render);
            //.fetch({reset:true,});
            */            
            
        },

        render:function() {
            console.log("Rendering patient view");
            this.$el.html("<div>TESTING</div>");
            
            //var tmpl = _.template(this.template); //tmpl is a function that takes a JSON and returns html
            //this.setElement(tmpl(this.patientInfoModel.toJSON()));
            //this.$el.modal('show');
           // this.patientInfo.each(function())
           //return this;
        }

    });

    return PatientInfoView;
});