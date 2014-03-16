define([
        // These are path alias that we configured in our bootstrap
        'jquery',     
        'underscore', 
        'backbone',
        'MHandoffCore',
        'Collections/TaskCollection',
        'Collections/NoteCollection',
        ], function($, _, Backbone, MHandoffCore, TaskCollection, NoteCollection){

    var Patient = Backbone.Model.extend({
        idAttribute: 'basicInfo.patientId',
        notesCollection:undefined,
        tasksCollection:undefined,


        baseUrl:"/dashboard/tiles/patient.do",

        url : function() {
            return this.baseUrl+"?patient="+this.get("patientId");
        },

        pullItems:function() {
            console.log("Pulling patient Items");
            console.log(this);
            var self = this;
            this.notesCollection = new NoteCollection(MHandoffCore.loggedInUser.uniqname, this.get("basicInfo").patientId);
            this.tasksCollection = new TaskCollection(MHandoffCore.loggedInUser.uniqname, this.get("basicInfo").patientId);
            return $.when(this.notesCollection.fetch({reset:true}),
                    this.tasksCollection.fetch({reset:true})
            );
        },
    });


    return Patient;
});