define([
  // These are path alias that we configured in our bootstrap
  'jquery',     
  'underscore', 
  'backbone',
  'utils',
  'moment',
], function($, _, Backbone, Utils, moment){
    
    
    
    var Note = Backbone.Model.extend({
        url:"",
        defaults : {
            noteId : "0",
            priority :"Low Priority",
            priorityCode:50,
            reporter:"N/A",
           // reportedDate:(new Date()).getTime()/1000,
            reportedDate:moment().valueOf()/1000,
            expiration:moment().add('days', 1).valueOf()/1000,
            badgeLevel:"",
            text:"Note text",
        },
        
    });
    
    
    return Note;
});