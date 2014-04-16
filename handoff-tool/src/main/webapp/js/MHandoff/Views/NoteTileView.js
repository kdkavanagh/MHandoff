define([
        'jquery',     
        'underscore', 
        'backbone',
        'isotope',
        'Models/Note',
        'Collections/NoteCollection',
        'Views/NoteModalView',
        'utils',
        ], function($, _, Backbone, Isotope, Note, NoteCollection,NoteModalView, Utils){

    var NoteTileView = Backbone.View.extend({
        tagName: 'div',
        template:null,

        events: {
            'click span#closeIcon': "removeClickHandler",
            'click button#openNoteButton' : "openNote",
            'click' : "openNote",
        },

        initialize : function (options) {
            this.options = options || {};

            this.noteModel = this.options.noteModel;
            this.templates = this.options.templates;
            this.template = this.templates.tile;
            var priorityCode = this.noteModel.get("priorityCode");
            this.noteModel.set("badgeLevel", Utils.priorityLevelToBadge(priorityCode));
            return this;
        },

        updateBadge:function() {
            this.$notePriorityBadge.html( _.template.getPriorityStringFromCode(this.noteModel.get("priorityCode")));
            this.$notePriorityBadge.attr("class", "badge "+this.noteModel.get("badgeLevel")+" pull-right");
        },

        updateView:function() {
            this.$noteText.html(this.noteModel.get("text"));
        },

        render: function(isotopeObj){
            this.isotopeObj = isotopeObj;
            var tmpl = _.template(this.template); //tmpl is a function that takes a JSON and returns html
            this.setElement(tmpl(this.noteModel.toJSON()));
            //init our cached selectors
            this.$noteText = this.$el.find("p#noteText");
            
            this.$notePriorityBadge = this.$el.find("#priorityBadge");
            this.updateView();
            this.updateBadge();

            this.$closeIcon = this.$el.find("span.closeIcon");
            this.$closeIcon.tooltip({ container: 'body'});
            this.$el.data('model', this.noteModel);
            isotopeObj.insert( this.el );
            
            this.listenTo(this.noteModel, 'change:text', this.updateView);
            this.listenTo(this.noteModel, 'change:badgeLevel', this.updateBadge);
            this.listenTo(this.noteModel, 'change:priorityCode', this.updateBadge);

            this.trigger('render', this);
            return this;
        },

        openNote: function() {
            var modal = new NoteModalView({parent:this,el:$("modalContainer"), noteModel:this.noteModel, template:this.templates.modal});
            modal.render();
            var self = this;
            modal.on('noteSaved',function() {console.log("Relayout");if(self.isotopeObj != null) {self.isotopeObj.layout();}} );
            return modal;
        },

        removeClickHandler : function(event){
            console.log("Removing...");
            this.$closeIcon.tooltip('hide');
            this.parent.undoStack.push(this.noteModel, 'destroy');
            this.remove();
            this.trigger('remove', this);
            return false;
        },

        remove: function() {
            this.isotopeObj.remove( this.el );
            // layout remaining item elements
            
            Backbone.View.prototype.remove.apply(this, arguments);
            return this;
        },

        destroy_full: function(event) {
            console.log("Destroying item" );
            this.$closeIcon.tooltip('destroy');
            
            delete this.$closeIcon;
            delete this.$notePriorityBadge;
            delete this.$noteText;
            this.unbind(); // Unbind all local event bindings
            this.noteModel.collection.remove(this.noteModel);  //Remove this note from our collection
            this.options.parent.unbind( 'close:all', this.close, this ); // Unbind reference to the parent view

            this.remove(); // Remove view from DOM

            delete this.$el; // Delete the jQuery wrapped object variable
            delete this.el; // Delete the variable reference to this node

        }
    });


    return NoteTileView;
});