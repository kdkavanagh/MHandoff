define([
  // These are path alias that we configured in our bootstrap
  'require',
  'jquery',     
  'underscore', 
  'backbone',
  'Models/Note',
  'utils',
  'moment',
], function(require,$, _, Backbone, Note, Utils, moment){
    
    
    
    var Task = Backbone.Model.extend({
        url:"",
        defaults : {
            noteId : "0",
            priorityCode:50,
            reporter:"N/A",
            reportedDate:moment().valueOf()/1000,
            expiration:moment().add('days', 1).valueOf()/1000,
            badgeLevel:"",
            text:"Note text",
            assignee:"Unassigned",
            status:0,
        },
        
    });
    
    
    return Task;
});