define([
  // These are path alias that we configured in our bootstrap
  'jquery',     
  'underscore', 
  'backbone',
  'utils',
], function($, _, Backbone, Utils){
    
    
    
    var PatientInfo = Backbone.Model.extend({

        url:"/patientInfo.do?patient=Kyle&level=1",
        patientId: "Kyle",
        patientLevel: "1",



        defaults : {
            idNum : "1",
            name :"Abraham",
            dateOfBirth:"01/01/2000",
            location: "",
            picBase: "",
            numNotest: "",
            numTasks:"",
            numAlerts: "",
        },

        /*
        fetch: function() {
          $.ajax({
            type: 'GET',
            url: this.url,
            success : function(data) {
              //to see the data.
              console.log(data);
              //console.log("HELLO");
            }
          });

        }
        */
        //url : function() {

        //    return "/patientInfo.do?patient=" + this.patientId+"&patient="+this.patientLevel;
        //},
        
    });
    
    
    return PatientInfo;
});