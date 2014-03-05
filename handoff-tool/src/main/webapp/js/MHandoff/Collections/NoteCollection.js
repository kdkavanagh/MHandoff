define([
        // These are path alias that we configured in our bootstrap
        'jquery',     
        'underscore', 
        'backbone',
        'Models/Note',
        'require'
        ], function($, _, Backbone, Note, require){


    var NoteCollection = Backbone.Collection.extend({
        model:Note,
        itemType:"note",
        patientId:null,

        initialize: function(patientId) {
            this.patientId = patientId;
            

        },
        
        initStream : function(patientId) {
            this.stream = require("MHandoff").stream();

            var self = this;
            this.stream.on(patientId+":notes:create", function(e) {
                console.log("Received create note topic message");
                var newNote = new Note({noteId:e});
                newNote.fetch();
                self.add(newNote);
            }, this);
            this.stream.on(patientId+":notes:update", function(e) {
                console.log("Received update note topic message");
                if(self.get(e) !== undefined) {
                    self.get(e).fetch();
                } else {
                    var newNote = new Note({noteId:e});
                    newNote.fetch();
                    self.add(newNote);
                }
            }, this);
        },

        createNewItem : function() {
            var note = new this.model({patientId:this.patientId});
            this.add(note);
        },


        url : function() {
            return "/patient/items/list.do?type=" + this.itemType+"&patient="+this.patientId;
        },
    });


    return NoteCollection;
});