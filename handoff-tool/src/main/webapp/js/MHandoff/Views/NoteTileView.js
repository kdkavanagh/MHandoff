define([
        'jquery',     
        'underscore', 
        'backbone',
        'Models/Note',
        'Collections/NoteCollection',
        'Views/NoteModalView',
        'utils',
        ], function($, _, Backbone, Note, NoteCollection,NoteModalView, Utils){

    var NoteTileView = Backbone.View.extend({
        tagName: 'li',
        template:null,
        $noteText:null,
        $notePriorityBadge:null,
        $closeIcon:null,
        hidden:true,

        events: {
            'click span#closeIcon': "removeClickHandler",
            'click button#openNoteButton' : "openNote",
            'click div.panel-body' : "openNote",
        },

        initialize : function (options) {
            console.log("Creating new indiv note view");
            this.options = options || {};
            this.gridster = this.options.gridster;
            this.noteModel = this.options.noteModel;
            this.templates = this.options.templates;
            this.template = this.templates.tile;
            var priorityCode = this.noteModel.get("priorityCode");
            this.noteModel.set("badgeLevel", Utils.priorityLevelToBadge(priorityCode));

            this.listenTo(this.noteModel, 'change', this.updateView);
            this.listenTo(this.noteModel, 'change:badgeLevel', this.updateBadge);
            this.listenTo(this.noteModel, 'change:priorityCode', this.updateBadge);

            return this;
        },

        updateBadge:function() {
            this.$notePriorityBadge.html( _.template.getPriorityStringFromCode(this.noteModel.get("priorityCode")));
            this.$notePriorityBadge.attr("class", "badge "+this.noteModel.get("badgeLevel")+" pull-right");
        },

        updateView:function() {
            //init our cached selectors
            this.$noteText = this.$el.find("p#noteText");
            this.$notePriorityBadge = this.$el.find("#priorityBadge");
            this.$noteText.html(this.noteModel.get("text"));

        },

        render: function(){

            var tmpl = _.template(this.template); //tmpl is a function that takes a JSON and returns html
            this.setElement(tmpl(this.noteModel.toJSON()));

            this.updateView();
            this.updateBadge();
            this.gridster.add_widget(this.el);
            this.$closeIcon = this.$el.find("span.closeIcon");
            this.$closeIcon.tooltip({ container: 'body'});
            this.hidden = false;
            return this;
        },

        openNote: function() {
            var modal = new NoteModalView({parent:this,el:$("modalContainer"), noteModel:this.noteModel, template:this.templates.modal});
            modal.render();
            return modal;
        },

        removeClickHandler : function(event){
            console.log("Removing...");
            this.$closeIcon.tooltip('hide');
            this.remove();
            this.trigger('remove', this);
            return false;
        },
        
        hide:function() {
            this.remove();
            this.trigger('hidden', this);
            
        },

        remove: function() {
            this.gridster.remove_widget(this.$el);
            Backbone.View.prototype.remove.apply(this, arguments);
            this.hidden = true;
            return this;
        },

        destroy_full: function(event) {
            console.log("Destroying item" );
            this.$closeIcon.tooltip('destroy');
            delete this.$closeIcon;
            delete this.$notePriorityBadge;
            delete this.$noteText;
            this.unbind(); // Unbind all local event bindings
            this.noteModel.destroy();
            this.options.parent.unbind( 'close:all', this.close, this ); // Unbind reference to the parent view

            this.remove(); // Remove view from DOM

            delete this.$el; // Delete the jQuery wrapped object variable
            delete this.el; // Delete the variable reference to this node

        }
    });


    return NoteTileView;
    // What we return here will be used by other modules
});