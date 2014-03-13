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
            text:"",
        },

        baseUrl:"/patient/note.do",

        getExpirationMoment : function() {
            return moment(this.get("expiration") * 1000);
        },

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


    return Note;
});