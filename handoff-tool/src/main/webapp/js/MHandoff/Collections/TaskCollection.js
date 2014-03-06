define([
        // These are path alias that we configured in our bootstrap
        'jquery',     
        'underscore', 
        'backbone',
        'Models/Task',
        'utils',
        'stream',
        'moment'
        ], function($, _, Backbone, Task, Utils, Stream, moment){


    var TaskCollection = Backbone.Collection.extend({
        model:Task,
        itemType:"task",
        patientId:null,

        initialize: function(username, patientId) {
            this.patientId = patientId;
            this.user = username;

        },

        initStream : function(patientId) {
            this.stream = require("MHandoff").stream();

            var self = this;
            this.stream.on(patientId+":tasks:create", function(e) {
                console.log("Received create note topic message");
                var newTask = new Task({noteId:e});
                newTask.fetch();
                self.add(newTask);
            }, this);
            this.stream.on(patientId+":tasks:update", function(e) {
                console.log("Received update note topic message");
                if(self.get(e) !== undefined) {
                    self.get(e).fetch();
                } else {
                    var newTask = new Task({noteId:e});
                    newTask.fetch();
                    self.add(newTask);
                }
            }, this);
        },

        createNewItem : function() {
            var task = new this.model({patientId:this.patientId, reporter:this.user,  reportedDate:moment().valueOf()/1000,
                expiration:moment().add('days', 1).valueOf()/1000,});
            this.add(task);
        },


        url : function() {
            return "/patient/items/list.do?type=" + this.itemType+"&patient="+this.patientId;
        },
    });


    return TaskCollection;
});