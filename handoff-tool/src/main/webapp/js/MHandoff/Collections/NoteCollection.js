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
        getExpired : false,
        hasExpiredNotesLoaded : false,

        initialize: function(username, patientId) {
            this.patientId = patientId;
            this.user = username;
            this.initStream(patientId);

        },

        initStream : function(patientId) {

            var self = this;
            stream.subscribe(this,patientId+":"+this.itemType+":create", function(e) {
                console.log("Received create "+self.itemType+" topic message");
                var newNote = new self.model({noteId:e});
                newNote.fetch({
                    success: function(){
                        self.add(newNote);
                        self.trigger('pushAdd', newNote);
                    }
                });
            });
            stream.subscribe(this, patientId+":"+this.itemType+":update", function(e) {
                console.log("Received update note topic message");
                if(self.get(e) !== undefined) {
                    //We already have this note, and its handlers are already listening for changes
                    self.get(e).fetch();
                } else {
                    var newNote = new self.model({noteId:e});
                    newNote.fetch({
                        success: function(){
                            self.add(newNote);
                            self.trigger('pushAdd', newNote);
                        }
                    });
                }
            });
        },

        createNewItem : function(options) {
            var note = new this.model({patientId:this.patientId, reporter:this.user,  reportedDate:moment().valueOf()/1000,
                expiration:moment().add('days', 1).valueOf()/1000});
            this.add(note, options);
            return note;
        },
        
        


        url : function() {
            return "/patient/items/list.do?type=" + this.itemType+"&patient="+this.patientId+"&getExpired="+this.getExpired;
        }
    });


    return NoteCollection;
});