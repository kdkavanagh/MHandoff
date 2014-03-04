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
        idAttribute: 'noteId',
        defaults : {
            priorityCode:0,
            patientId:"1",
            reporter:"kdkav",
            reportedDate:moment().valueOf()/1000,
            expiration:moment().add('days', 1).valueOf()/1000,
            badgeLevel:"",
            text:"",
            assignee:"kminchan",
            status:0,
        },

        baseUrl:"/patient/task.do",
       

        sync: function(method, model, options) {
            options = options || {};
            if(method.toLowerCase() === 'read' || method.toLowerCase() === 'delete' ) {
                //We only need to send the noteId
                options.url= this.baseUrl+"?noteId="+ this.get("noteId");
            } else {
                options.url = this.baseUrl+"?noteId=" 
                + this.get("noteId")
                +"&patientId="+this.get("patientId")
                + "&reporter="+this.get("reporter")
                + "&reportedDate="+this.get("reportedDate")
                + "&expiration="+this.get("expiration")
                + "&priorityCode="+this.get("priorityCode")
                + "&text="+this.get("text"); 
            }
            return  Backbone.sync(method, model, options);
        },

    });
    
    
    return Task;
});