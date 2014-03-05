define([
        // These are path alias that we configured in our bootstrap
        'jquery',     
        'underscore', 
        'backbone',
        'gridster',
        'Models/Note',
        'Collections/NoteCollection',
        'Collections/TaskCollection',
        'Views/NoteTileView',
        ], function($, _, Backbone, Gridster, Note, NoteCollection,TaskCollection, NoteTileView){


    var NoteGridView = Backbone.View.extend({

        mostRecentlyDeletedView : null,
        $addNewNoteWidget:null,
        gridsterOpts:null,
        gridsterObj:null,

        events: {
            'click button#addNewButton': "addItem",
            'click #undoButton' : "undoRemove",
            'click #addNewTileInner' :"addItem",
        },

        initialize: function (options) {
            this.options = options || {};
            _.bindAll(this, 'render');
            //_.bindAll(this);


            this.notes = this.options.collection;
            this.noteViews = new Array();
            this.activeNoteViews = new Array();
            this.gridsterOpts = this.options.gridsterOpts;
            this.gridsterID = this.options.gridsterID;
            this.templates = this.options.templates;

            this.gridsterObj = this.$el.find(this.gridsterID+" > ul").gridster(this.gridsterOpts).data('gridster');

            this.notes.fetch({ reset:true,});
            this.listenTo(this.notes, 'reset', this.generateViews);
            this.listenTo(this.notes, 'add', this.newItemAdded);
        },

        createView: function(note, row, col, self) {
            var noteView = new NoteTileView({parent : self, noteModel:note,templates:this.templates, row:row, col:col, gridster : self.gridsterObj});
            self.noteViews.push(noteView);
            self.activeNoteViews.push(noteView);
            self.listenTo(noteView, 'hidden', self.noteHidden);
            self.listenTo(noteView, 'remove', self.updateUndoAndRemove);
            return noteView;

        },

        filter: function(filterFn) {

            for (var i = 0; i < this.noteViews.length; i++) {
                var view = this.noteViews[i]; 
                var priority = view.noteModel.get("priorityCode");
                var outOfBounds = filterFn(view.noteModel);
                if(outOfBounds && !view.hidden) {
                    view.hide();
                    console.log("removing view");
                } else if(!outOfBounds && view.hidden){
                    this.activeNoteViews.push(view.render());
                }
            }

        },


        generateViews: function() {
            //Destroy existing views
            while (this.noteViews.length > 0) {
                this.noteViews.pop().destroy_full(null);
            }

            var row = 0;
            var self = this;
            this.notes.each(function(note, index) { 
                col = index % 4;
                if(col == 0) {
                    row += 1;
                }
                self.createView(note, row, col, self);
            });
            this.render();
        },

        getItems: function() {
            console.log("Getting all items");
            this.notes.fetch({ data: $.param({ patient: "kyle",}) 
                ,reset:true,});

        },
        addItem: function() {
            console.log("Adding item");
            this.notes.createNewItem();
        },

        newItemAdded:function(note) {
            var newView = this.createView(note, 0, 0, this).render();
            newView.openNote().toggleEditing();
            this.trigger('gridchange');
        },


        undoRemove:function() {
            if(this.mostRecentlyDeletedView != null) {
                $('#undoAlert').alert('close'); 
                this.noteViews.push(this.mostRecentlyDeletedView);
                this.mostRecentlyDeletedView.render();
                this.mostRecentlyDeletedView = null;
                this.trigger('gridchange');
            }
        },

        updateUndoAndRemove:function(event) {
            if(this.mostRecentlyDeletedView != null) {
                //There was a previously deleted note, lets get rid of it for good
                console.log("Permanently deleting note");
                this.mostRecentlyDeletedView.destroy_full(null);                
            }

            this.mostRecentlyDeletedView = event;
            $('#undoAlertHolder').html('<div id="undoAlert" class="alert alert-info alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><span><button class="btn btn-default" id="undoButton">Undo..</button></span></div>');
            this.noteRemoved(event);
        },

        noteHidden:function(event) {

            var index = this.activeNoteViews.indexOf(event);
            if (index > -1) {
                this.activeNoteViews.splice(index, 1);
            }
        },

        noteRemoved:function(event) {
            //remove the view from our list of views to render
            noteHidden(event);
            var index = this.noteViews.indexOf(event);
            if (index > -1) {
                this.noteViews.splice(index, 1);
            }
            this.trigger('gridchange');
        },

        render: function(){
            for (var i = 0; i < this.activeNoteViews.length; i++) {
                this.activeNoteViews[i].render();
            }
            return this;
        },

        destroyView : function() {
            this.undelegateEvents();

            this.$el.removeData().unbind(); 
            //destroy the tiles
            for (var i = 0; i < this.noteViews.length; i++) {
                this.noteViews[i].destroy_full();
            }
            //Remove view from DOM
            this.remove();  
            Backbone.View.prototype.remove.call(this);

        },
    });

    return NoteGridView;
});