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
            text:"Note text",
            assignee:"kminchan",
            status:0,
        },
        
        initialize : function() {
            this.methodToURL.parent= this;
        },

        baseUrl:"/patient/task.do",
        methodToURL: {
            'read': function() {return this.parent.baseUrl+"?noteId="+this.parent.get("noteId");},
            'create': function() {return this.parent.fullUrl();},
            'update': function() {return this.parent.fullUrl();},
            'delete': function() {return this.parent.baseUrl+"?noteId="+this.parent.get("noteId");},
        },

        sync: function(method, model, options) {
            options = options || {};
            options.url = model.methodToURL[method.toLowerCase()]();
            return  Backbone.sync(method, model, options);
        },
        
        
        fullUrl : function() {
            return this.baseUrl+"?noteId=" 
            + this.get("noteId")
            + "&patientId="+this.get("patientId")
            + "&reporter="+this.get("reporter")
            + "&reportedDate="+this.get("reportedDate")
            + "&expiration="+this.get("expiration")
            + "&priorityCode="+this.get("priorityCode")
            + "&assignee="+this.get("assignee")
            + "&status="+this.get("status")
            + "&text="+this.get("text");
        },

    });
    
    
    return Task;
});