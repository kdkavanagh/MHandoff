define([
        // These are path alias that we configured in our bootstrap
        'jquery',     
        'underscore', 
        'backbone',
        'Models/Task',
        'utils',
        'stream',
        'moment'
        ], function($, _, Backbone, Task, Utils, stream, moment){


    var TaskCollection = Backbone.Collection.extend({
        model:Task,
        itemType:"task",
        patientId:null,

        initialize: function(username, patientId) {
            this.patientId = patientId;
            this.user = username;
            this.initStream(patientId);
        },

        initStream : function(patientId) {

            var self = this;
            stream.subscribe(this,patientId+":tasks:create", function(e) {
                console.log("Received create note topic message");
                var newTask = new Task({noteId:e});
                newTask.fetch({
                    success: function(){
                        self.add(newTask, {silent: true});
                        self.trigger('pushAdd', newTask);
                    }
                });
            });
            stream.subscribe(this, patientId+":tasks:update", function(e) {
                console.log("Received update note topic message");
                if(self.get(e) !== undefined) {
                    self.get(e).fetch();
                } else {
                    var newTask = new Task({noteId:e});
                    newTask.fetch({
                        success: function(){
                            self.add(newTask, {silent: true});
                            self.trigger('pushAdd', newTask);
                        }
                    });
                }
            });
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