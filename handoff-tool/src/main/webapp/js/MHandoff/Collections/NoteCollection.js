define([
        // These are path alias that we configured in our bootstrap
        'jquery',     
        'underscore', 
        'backbone',
        'Models/Note',
        'stream'
        ], function($, _, Backbone, Note, stream){


    var NoteCollection = Backbone.Collection.extend({
        model:Note,
        itemType:"note",
        patientId:null,

        initialize: function(username, patientId) {
            this.patientId = patientId;
            this.user = username;
            this.initStream(patientId);
            console.log("Creating new collection");

        },

        initStream : function(patientId) {

            var self = this;
            stream.subscribe(this,patientId+":notes:create", function(e) {
                console.log("Received create note topic message");
                var newNote = new Note({noteId:e,});
                newNote.fetch({
                    success: function(){
                        self.add(newNote, {silent: true});
                        self.trigger('pushAdd', newNote);
                    }
                });
            });
            stream.subscribe(this, patientId+":notes:update", function(e) {
                console.log("Received update note topic message");
                if(self.get(e) !== undefined) {
                    //We already have this note, and its handlers are already listening for changes
                    self.get(e).fetch();
                } else {
                    var newNote = new Note({noteId:e});
                    newNote.fetch({
                        success: function(){
                            self.add(newNote, {silent: true});
                            self.trigger('pushAdd', newNote);
                        }
                    });
                }
            });
        },

        createNewItem : function() {
            var note = new this.model({patientId:this.patientId, reporter:this.user,  reportedDate:moment().valueOf()/1000,
                expiration:moment().add('days', 1).valueOf()/1000,});
            this.add(note);
        },


        url : function() {
            return "/patient/items/list.do?type=" + this.itemType+"&patient="+this.patientId;
        },
    });


    return NoteCollection;
});