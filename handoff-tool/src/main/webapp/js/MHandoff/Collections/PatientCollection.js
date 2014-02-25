define([
  // These are path alias that we configured in our bootstrap
  'jquery',     
  'underscore', 
  'backbone',
  'Models/Patient'
], function($, _, Backbone, Patient){
    
    
    var PatientCollection = Backbone.Collection.extend({
        model : Patient,
      
    });
    
    
    return PatientCollection;
  // What we return here will be used by other modules
});