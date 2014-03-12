define([
        // These are path alias that we configured in our bootstrap
        'jquery',     
        'underscore', 
        'backbone',
        'Models/Task',
        'utils',
        'stream',
        'Collections/NoteCollection'
        ], function($, _, Backbone, Task, Utils, stream, NoteCollection){


    var TaskCollection = NoteCollection.extend({
        model:Task,
        itemType:"task",
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

    });


    return TaskCollection;
});