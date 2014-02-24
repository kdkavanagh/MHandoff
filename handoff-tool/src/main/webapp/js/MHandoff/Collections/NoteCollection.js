define([
  // These are path alias that we configured in our bootstrap
  'jquery',     
  'underscore', 
  'backbone',
  'Models/Note'
], function($, _, Backbone, Note){
    
    
    var NoteCollection = Backbone.Collection.extend({
        model : Note,
        itemType:"note",
        patientId:null,
        
        initialize: function(type, patientId) {
            if(type) {
                this.itemType = type;
            }
            this.patientId = patientId;
        },
        
        
        url : function() {
            return "/patient/items.do?type=" + this.itemType+"&patient="+this.patientId;
        },
    });
    
    
    return NoteCollection;
  // What we return here will be used by other modules
});