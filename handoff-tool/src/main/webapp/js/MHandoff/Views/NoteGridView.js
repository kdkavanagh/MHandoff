define([
        'jquery',     
        'underscore', 
        'backbone',
        'isotope',
        'UndoStack',
        'Models/Note',
        'Collections/NoteCollection',
        'Collections/TaskCollection',
        'Views/NoteTileView',
        'Collections/filters',
        'backbone_hotkeys',
        'keymaster'
        ], function($, _, Backbone, Isotope, UndoStack,Note, NoteCollection,TaskCollection, NoteTileView, Filter, Backbone_hotkeys, Keymaster){


    var NoteGridView = Backbone.View.extend({

        mostRecentlyDeletedView : null,
        $addNewNoteWidget:null,
        currentFilter:{},
        isotopeObj:null,

        events: {
            'click button#addNewButton': "addItem",
            'click #undoButton' : "undoRemove",
            'click #addNewTileInner' :"addItem",
            'keyup[Ctrl+m]' : "addItem"
        },

        initialize: function (options) {
            this.options = options || {};
            _.bindAll(this, 'render');

            this.notes = this.options.collection;
            this.noteViews = [];
            this.activeNoteViews = [];
            this.templates = this.options.templates;
            this.currentFilter =  Filter.generateDefaultFilter();
            this.listenTo(this.notes, 'reset', this.generateViews);
            this.listenTo(this.notes, 'add', this.newItemAdded);
            var self = this;
            this.undoStack = new UndoStack();
            //Delay generating views till Isotope has loaded (shitty fix)
            setTimeout(function() {
                self.generateViews();
            }, 250);

            //this.listenTo(this.notes, 'pushAdd', this.newItemPushed);
        },

        createView: function(note, self) {
            var noteView = new NoteTileView({parent : self, noteModel:note,templates:this.templates});
            self.noteViews.push(noteView);
            self.activeNoteViews.push(noteView);
            self.listenTo(noteView, 'remove', self.noteRemoved);
            return noteView;
        },


        resetFilters : function() {

            this.currentFilter = Filter.generateDefaultFilter();
            this.filter();
        },

        doFilter : function() {
            var self = this;
            this.isotopeObj.arrange({
                filter: function( itemElem ) {
                    return self.currentFilter.filter($(this).data('model'));
                },
                sortBy:self.currentFilter.sortPackage.sortBy,
                sortAscending: self.currentFilter.sortPackage.sortAscending
            });
        },

        sort : function(sortFnName) {
            this.currentFilter[sortFnName]();            
            this.doFilter();
        },

        filter: function(newFilter) {

            if(newFilter !== undefined) {
                this.currentFilter.addFilter(newFilter);
            }

            if(!this.notes.hasExpiredNotesLoaded && this.currentFilter.hasFilter( Filter.IncludeExpiredNotesFilter)) {
                console.log("Pulling expired Notes");
                //We need to pull some expired notes
                this.notes.getExpired = true;
                var self = this;
                this.notes.fetch().done(function() {

                    self.doFilter();
                    self.notes.hasExpiredNotesLoaded = true;
                });

            } else {
                this.doFilter();
            }
        },


        generateViews: function() {
            //Destroy existing views
            while (this.noteViews.length > 0) {
                this.noteViews.pop().destroy_full(null);
            }
            var self = this;
            this.notes.each(function(note, index) { 
                self.createView(note, self);
            });
            this.render();
        },

        addItem: function() {
            console.log("Adding item");
            var note = this.notes.createNewItem({silent:true});
            this.newItemAdded(note);
        },

        newItemAdded:function(note, fromEvent) {

            var newView = this.createView(note, this);//.render();
            if(!fromEvent) {
                var modal = newView.openNote();
                //Once we save the note for the first time, render the tile
                var self = this;
                newView.listenToOnce( modal,'noteSaved',function() {newView.render( self.isotopeObj);});
            } else {
                newView.render( this.isotopeObj);

            }
            this.trigger('gridchange');
        },


        undoRemove:function() {
            var theModel = this.undoStack.undo('save');
            var newView = this.createView(theModel, this).render( this.isotopeObj);
            if(this.undoStack.isEmpty()) {
                this.$el.find('#undoButton').prop('disabled', true);
            }
        },  


        noteRemoved:function(event) {
            //remove the view from our list of views to render
            this.$el.find('#undoButton').prop('disabled', false);
            var index = this.noteViews.indexOf(event);
            if (index > -1) {
                this.noteViews.splice(index, 1);
            }
            this.isotopeObj.layout();
        },

        render: function(){
            var self=this;
            this.isotopeObj = this.$el.find(this.options.gridId).isotope({
                layoutMode:'masonry',
                itemSelector:'.note',
                getSortData: {
                    date: function (itemElem) {
                        return $( itemElem ).data('model').get('reportedDate');
                    },
                    priority: function( itemElem ) {
                        return $( itemElem ).data('model').get('priorityCode');
                    }
                }
            }).data('isotope');
            $.each(this.noteViews, function(index, note) {
                note.render(self.isotopeObj);
            });
            
            this.resetFilters();
            this.isotopeObj.layout();
            this.$el.find('#undoButton').prop('disabled', true);
            return this;
        },

        destroyView : function() {
            this.undelegateEvents();

            this.$el.removeData().unbind(); 
            //destroy the tiles
            $.each(this.noteViews, function(index, note) {
                note.destroy_full();
            });
            
            //Remove view from DOM
            this.remove();
            Backbone.View.prototype.remove.call(this);

        }
    });

    return NoteGridView;
});
