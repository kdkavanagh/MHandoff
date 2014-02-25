define([
  // These are path alias that we configured in our bootstrap
  'jquery',     
  'underscore', 
  'backbone',
  'utils',
], function($, _, Backbone, Utils){
    
    
    
    var PatientInfo = Backbone.Model.extend({
        url:"",
        defaults : {
            idNum : "0",
            name :"Abraham",
            dateOfBirth:"01/01/2000",
            
            //utils is still included in the path above in define.
            //perhaps there is a function where it returns user's current
            //location. If not or if it is too complicated, forget it!
            location: "",
            picBase: "",
            numNotest: "",
            numTasks:"",
            numAlerts: "",
        },
        
    });
    
    
    return PatientInfo;
});