define([
        // These are path alias that we configured in our bootstrap
        'jquery',     
        'underscore', 
        'backbone',
        'Models/Task',
        'utils',
        'stream'
        ], function($, _, Backbone, Task, Utils, Stream){


    var TaskCollection = Backbone.Collection.extend({
        model:Task,
        itemType:"task",
        patientId:null,

        initialize: function(patientId) {
            this.patientId = patientId;
            this.stream = new Stream(patientId+",tasks");
            this.stream.on('newNote', function(e) {
                this.add(e);
            }, this);
        },
        
        createNewItem : function() {
            this.add(new this.model());
        },


        url : function() {
            return "/patient/items.do?type=" + this.itemType+"&patient="+this.patientId;
        },
    });


    return TaskCollection;
});