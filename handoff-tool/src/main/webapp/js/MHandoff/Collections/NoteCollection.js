define([
  // These are path alias that we configured in our bootstrap
  'jquery',     
  'underscore', 
  'backbone',
  'Models/Note'
], function($, _, Backbone, Note){
    
    
    var NoteCollection = Backbone.Collection.extend({
        model : Note,
        url : '/patient/items.do?type=note',
    });
    
    
    return NoteCollection;
  // What we return here will be used by other modules
});