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
        
        getTodaysDate:function(plusDays) {
            var today = new Date();
            var dd = today.getDate()+plusDays;
            var mm = today.getMonth()+1; //January is 0!

            var yyyy = today.getFullYear();
            if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = mm+'/'+dd+'/'+yyyy;
            return today;
        }
    });
    
    
    return Note;
});