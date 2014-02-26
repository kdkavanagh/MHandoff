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

        events: {
            'click span#closeIcon': "buttonClickHandler",
            'click button#openNoteButton' : "openNote",
        },

        initialize : function (options) {
            console.log("Creating new indiv note view");
            this.options = options || {};
            this.gridster = this.options.gridster;
            this.noteModel = this.options.noteModel;
            this.row = this.options.row;
            this.col = this.options.col;
            this.templates = this.options.templates;
            this.template = this.templates.tile;
            var priorityCode = this.noteModel.get("priorityCode");
            if(priorityCode == 200) {
                this.noteModel.set("badgeLevel", "badge-error");
            } else if(priorityCode == 150 ) {
                this.noteModel.set("badgeLevel", "badge-warning");
            }else {
                this.noteModel.set("badgeLevel","");
            }
            
            this.noteModel.on('change', this.updateView, this);

            return this;
        },

        updateView:function() {
            //init our cached selectors
            this.$noteText = this.$el.find("p#noteText");
            this.$notePriorityBadge = this.$el.find("#priorityBadge");
            this.$noteText.html(this.noteModel.get("text"));
            this.$notePriorityBadge.html( _.template.getPriorityStringFromCode(this.noteModel.get("priorityCode")));
            this.$notePriorityBadge.attr("class", "badge "+this.noteModel.get("badgeLevel")+" pull-right");

        },

        render: function(){
            
            var tmpl = _.template(this.template); //tmpl is a function that takes a JSON and returns html
            this.setElement(tmpl(this.noteModel.toJSON()));
            this.check();
            this.updateView();
            this.gridster.add_widget(this.el);
            this.$closeIcon = this.$el.find("span.closeIcon");
            this.$closeIcon.tooltip({ container: 'body'});
            return this;
        },

        check: function() {
            var checker = new Utils.checkLength();
            checker.check();
            //maybe set the vertical height of the gridster obj here??
            //var moreThis = this.$el.find('.more');
            //moreThis.popover({content:this.noteModel.get("text")});
        },

        openNote: function() {
            var modal = new NoteModalView({parent:this,el:$("modalContainer"), noteModel:this.noteModel, template:this.templates.modal});
            modal.render();
            return modal;
        },

        buttonClickHandler : function(event){
            console.log("Removing...");
            //this.noteModel.destroy();
            this.$closeIcon.tooltip('hide');
            this.gridster.remove_widget(this.$el);
            this.remove();

            return false;
        },

        remove: function() {
            Backbone.View.prototype.remove.apply(this, arguments);
            this.trigger('remove', this);
            return this;
        },

        destroy_full: function(event) {
            console.log("Destroying item" );
            this.$closeIcon.tooltip('destroy');
            delete this.$closeIcon;
            delete this.$notePriorityBadge;
            delete this.$noteText;
            this.unbind(); // Unbind all local event bindings
            this.noteModel.unbind( 'change', this.render, this ); // Unbind reference to the model
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