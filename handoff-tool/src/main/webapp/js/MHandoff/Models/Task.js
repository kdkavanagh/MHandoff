define([
  // These are path alias that we configured in our bootstrap
  'jquery',     
  'underscore', 
  'backbone',
  'Models/Note',
  'utils',
], function($, _, Backbone, Note, Utils){
    
    
    
    var Task = Backbone.Model.extend({
        url:"",
        defaults : {
            noteId : "0",
            priority :"1",
            reporter:"N/A",
            reportedDate:Utils.getTodaysDate(0),
            expiration:Utils.getTodaysDate(1),
            badgeLevel:"",
            text:"Note text",
            assignee:"Unassigned",
            status:"Unknown",
        },
        
    });
    
    
    return Task;
});