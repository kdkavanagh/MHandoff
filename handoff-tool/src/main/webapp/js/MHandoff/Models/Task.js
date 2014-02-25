define([
  // These are path alias that we configured in our bootstrap
  'jquery',     
  'underscore', 
  'backbone',
  'Models/Note',
  'utils',
  'moment',
], function($, _, Backbone, Note, Utils, moment){
    
    
    
    var Task = Backbone.Model.extend({
        url:"",
        defaults : {
            noteId : "0",
            priority :"1",
            reporter:"N/A",
            reportedDate:moment().valueOf()/1000,
            expiration:moment().add('days', 1).valueOf()/1000,
            badgeLevel:"",
            text:"Note text",
            assignee:"Unassigned",
            status:"Unknown",
        },
        
    });
    
    
    return Task;
});