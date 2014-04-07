define([
        'jquery',     
        'underscore', 
        'backbone',
        'isotope',
        'Models/Note',
        'Collections/NoteCollection',
        'Collections/TaskCollection',
        'Views/NoteTileView',
        'Collections/filters',
        'backbone_hotkeys',
        'keymaster',
        ], function($, _, Backbone, Isotope, Note, NoteCollection,TaskCollection, NoteTileView, Filter, Backbone_hotkeys, Keymaster){


    var NoteGridView = Backbone.View.extend({

        mostRecentlyDeletedView : null,
        $addNewNoteWidget:null,
        currentFilter:{},
        isotopeObj:null,

        events: {

            'click button#addNewButton': "addItem",
            'click #undoButton' : "undoRemove",
            'click #addNewTileInner' :"addItem",
            'keyup[Ctrl+m]' : "addItem",
        
        },

        initialize: function (options) {
            this.options = options || {};
            _.bindAll(this, 'render');

            this.notes = this.options.collection;
            this.noteViews = new Array();
            this.activeNoteViews = new Array();
            this.templates = this.options.templates;
            this.currentFilter =  Filter.generateDefaultFilter();
            this.listenTo(this.notes, 'reset', this.generateViews);
            this.listenTo(this.notes, 'add', this.newItemAdded);
            var self = this;
            //Delay generating views till Isotope has loaded (shitty fix)
            setTimeout(function() {
                self.generateViews();
            }, 250);

            //this.listenTo(this.notes, 'pushAdd', this.newItemPushed);
        },

        createView: function(note, row, col, self) {
            var noteView = new NoteTileView({parent : self, noteModel:note,templates:this.templates, row:row, col:col});
            self.noteViews.push(noteView);
            self.activeNoteViews.push(noteView);
            self.listenTo(noteView, 'remove', self.updateUndoAndRemove);

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

            });
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

        addItem: function() {
            console.log("Adding item");
            var note = this.notes.createNewItem({silent:true});
            this.newItemAdded(note);
        },

        newItemAdded:function(note, fromEvent) {

            var newView = this.createView(note, 0, 0, this);//.render();
            if(!fromEvent) {
                var modal = newView.openNote();
                //Once we save the note for the first time, render the tile
                var self = this;
                newView.listenToOnce( modal,'noteSaved',function() { newView.render( self.isotopeObj);});
            } else {
                newView.render( this.isotopeObj);

            }
            this.trigger('gridchange');
        },


        undoRemove:function() {
            if(this.mostRecentlyDeletedView != null) {
                $('#undoAlert').alert('close'); 
                this.noteViews.push(this.mostRecentlyDeletedView);
                this.mostRecentlyDeletedView.render();
                this.mostRecentlyDeletedView = null;
                this.trigger('gridchange');
                var undoButton = document.getElementById("undoButton");
                undoButton.style.display = 'none';
            }
        },  

        updateUndoAndRemove:function(event) {
            if(this.mostRecentlyDeletedView != null) {
                //There was a previously deleted note, lets get rid of it for good
                console.log("Permanently deleting note");
                console.log("Testing stuff");
                this.mostRecentlyDeletedView.destroy_full(null);                
            }

            this.mostRecentlyDeletedView = event;
            this.noteRemove(event);
        },

        noteRemove:function(event) {
            //remove the view from our list of views to render
            var undoButton = document.getElementById("undoButton");
            undoButton.style.display = '';
            this.mostRecentlyDeletedView = event;
            var index = this.activeNoteViews.indexOf(event);
            if (index > -1) {
                this.activeNoteViews.splice(index, 1);
            }
            var index = this.noteViews.indexOf(event);
            if (index > -1) {
                this.noteViews.splice(index, 1);
            }
            this.isotopeObj.layout();
        },

        render: function(){
            this.isotopeObj = this.$el.find(this.options.gridId).isotope({
                layoutMode:'masonry',
                itemSelector:'.note',
            }).data('isotope');
            for (var i = 0; i < this.activeNoteViews.length; i++) {
                this.activeNoteViews[i].render(this.isotopeObj);
            }
            this.isotopeObj.layout();
            $(window).resize();

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
