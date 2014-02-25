define([
        // These are path alias that we configured in our bootstrap
        'jquery',     
        'underscore', 
        'backbone',
        'Models/Note',
        'Models/Task',
        ], function($, _, Backbone, Note, Task){


    var NoteCollection = Backbone.Collection.extend({
        model:Note,
        itemType:"note",
        patientId:null,

        initialize: function(patientId) {
            this.patientId = patientId;
        },
        
        createNewItem : function() {
            
            this.add(new this.model());
        },


        url : function() {
            return "/patient/items.do?type=" + this.itemType+"&patient="+this.patientId;
        },
    });


    return NoteCollection;
    // What we return here will be used by other modules
});