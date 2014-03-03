define([
        // These are path alias that we configured in our bootstrap
        'jquery',     
        'underscore', 
        'backbone',
        'utils',
        'moment',
        ], function($, _, Backbone, Utils, moment){



    var Note = Backbone.Model.extend({
        idAttribute: 'noteId',
        defaults : {
            patientId:"1",  //Will need to get the patient from the view
            priorityCode:0,
            reporter:"kdkav",  //Will need to get logged in user
            reportedDate:moment().valueOf()/1000,
            expiration:moment().add('days', 1).valueOf()/1000,
            badgeLevel:"",
            text:"Note text",
        },

        initialize : function() {
            this.methodToURL.parent= this;
        },

        baseUrl:"/patient/note.do",
        methodToURL: {
            'read': function() {return this.parent.baseUrl+"?noteId="+this.parent.get("noteId");},
            'create': function() {return this.parent.fullUrl();},
            'update': function() {return this.parent.fullUrl();},
            'delete': function() {return this.parent.baseUrl+"?noteId="+this.parent.get("noteId");},
        },

        fullUrl : function() {
            return "/patient/note.do?noteId=" 
            + this.get("noteId")
            +"&patientId="+this.get("patientId")
            + "&reporter="+this.get("reporter")
            + "&reportedDate="+this.get("reportedDate")
            + "&expiration="+this.get("expiration")
            + "&priorityCode="+this.get("priorityCode")
            + "&text="+this.get("text"); 
        },

        sync: function(method, model, options) {
            options = options || {};
            options.url = model.methodToURL[method.toLowerCase()]();
            return  Backbone.sync(method, model, options);
        },

    });


    return Note;
});