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
        
        initialize: function(type) {
            if(type) {
                this.itemType = type;
            }
        },
        
        
        url : function() {
            return "/patient/items.do?type=" + this.itemType;
        },
    });
    
    
    return NoteCollection;
  // What we return here will be used by other modules
});