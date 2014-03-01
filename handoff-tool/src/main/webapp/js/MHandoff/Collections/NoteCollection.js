define([
        // These are path alias that we configured in our bootstrap
        'jquery',     
        'underscore', 
        'backbone',
        'Models/Note',
        'Models/Task',
        'stream'
        ], function($, _, Backbone, Note, Task, Stream){


    var NoteCollection = Backbone.Collection.extend({
        model:Note,
        itemType:"note",
        patientId:null,

        initialize: function(patientId) {
            this.patientId = patientId;
            this.stream = new Stream(patientId+",notes");
            this.stream.on('newNote', function(e) {
                this.add(e);
            }, this);
        },

        createNewItem : function() {

            this.add(new this.model());
        },


        url : function() {
            return "/patient/items/list.do?type=" + this.itemType+"&patient="+this.patientId;
        },
    });


    return NoteCollection;
    // What we return here will be used by other modules
});