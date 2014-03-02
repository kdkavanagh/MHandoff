define([
        // These are path alias that we configured in our bootstrap
        'jquery',     
        'underscore', 
        'backbone',
        'Models/Note',
        'stream'
        ], function($, _, Backbone, Note, Stream){


    var NoteCollection = Backbone.Collection.extend({
        model:Note,
        itemType:"note",
        patientId:null,

        initialize: function(patientId) {
            this.patientId = patientId;
//            this.stream = new Stream(patientId+",notes");
//            this.stream.on('newNote', function(e) {
//                this.add(e);
//            }, this);
        },

        createNewItem : function() {
            var note = new this.model();
            this.add(note);
        },


        url : function() {
            return "/patient/items/list.do?type=" + this.itemType+"&patient="+this.patientId;
        },
    });


    return NoteCollection;
});