define([
  // These are path alias that we configured in our bootstrap
  'jquery',     
  'underscore', 
  'backbone',
  'utils',
], function($, _, Backbone, Utils){
    
    
    
    var Note = Backbone.Model.extend({
        url:"",
        defaults : {
            noteId : "0",
            priority :"1",
            reporter:"N/A",
            reportedDate:Utils.getTodaysDate(0),
            expiration:Utils.getTodaysDate(1),
            badgeLevel:"",
            text:"Note text",
        },
        
    });
    
    
    return Note;
});