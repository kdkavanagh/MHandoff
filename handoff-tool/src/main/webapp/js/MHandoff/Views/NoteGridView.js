define([
  // These are path alias that we configured in our bootstrap
  'jquery',     
  'underscore', 
  'backbone',
  'gridster',
  'Models/Note',
  'Collections/NoteCollection',
  'Collections/TaskCollection',
  'Views/NoteTileView'
], function($, _, Backbone, Gridster, Note, NoteCollection,TaskCollection, NoteTileView){
    
    
    var NoteGridView = Backbone.View.extend({

        mostRecentlyDeletedView : null,
        $addNewNoteWidget:null,
        gridsterOpts:null,
        gridsterObj:null,
        noteType:true,

        events: {
            'click #buttonPress': "getItems",
            'click button#addNewButton': "addItem",
            'click #undoButton' : "undoRemove",
            'click #addNewTileInner' :"addItem",
        },

        initialize: function (options) {
            this.options = options || {};
            _.bindAll(this, 'render');
            
            this.notes = this.options.collection;
            if(this.notes instanceof TaskCollection) {
                this.noteType = false;
            }
            this.noteViews = new Array();
            this.garbageViews = new Array();
            this.gridsterOpts = this.options.gridsterOpts;
            this.gridsterID = this.options.gridsterID;
            this.templates = this.options.templates;

            this.gridsterObj = this.$el.find(this.gridsterID+" > ul").gridster(this.gridsterOpts).data('gridster');

            this.notes.fetch({ reset:true,});
            this.notes.on('reset', this.generateViews, this);
            //this.notes.on('change', this.render);
            this.notes.on('add', this.newItemAdded, this);
        },

        createView: function(note, row, col, self) {
            //var gridsterObj = $("#noteGrid ul").gridster().data('gridster');
            
            var noteView = new NoteTileView({parent : self, noteModel:note,templates:this.templates, row:row, col:col, gridster : self.gridsterObj});
            self.noteViews.push(noteView);
            noteView.on('remove', self.noteRemoved, self);
            return noteView;

        },

        generateViews: function() {
            //Destroy existing views
            while (this.noteViews.length > 0) {
                this.garbageViews.push(this.noteViews.pop());
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
            
           // var addNewItemHtml="<div class=\"note addNewTile\"><div id=\"addNewTileInner\" class=\"\"><span class=\"glyphicon glyphicon-plus addNewTileIcon ignoreDrag\"></span>Add New Item</div><div>";
           // this.$addNewNoteWidget= this.gridsterObj.add_widget(addNewItemHtml);
          //  this.gridsterObj.disable_widget(this.$addNewNoteWidget);
            this.render();
        },

        getItems: function() {
            console.log("Getting all items");
            this.notes.fetch({ data: $.param({ patient: "kyle",}) 
                ,reset:true,});

        },
        addItem: function() {
            console.log("Adding item");
            //create the note
//            if(!this.noteType) {
//                this.notes.add(new Task());
//            } else {
//                this.notes.add(new Note());
//            }
            this.notes.createNewItem();
        },

        newItemAdded:function(note) {
            //get the next free position
            //var gridsterObj = $("#noteGrid ul").gridster().data('gridster');

            //Move the add new note item to the next free position
            //This is safe because the space is guarenteed to be empty
            var newView = this.createView(note, 0, 0, this).render();
            newView.openNote().toggleEditing();
            this.trigger('gridchange');
//          var next = gridsterObj.get_bottom_most_occupied_cell();
//          console.log(next);
            //Move the add new note item to the next free position
            //This is safe because the space is guarenteed to be empty
            //this.$addNewNoteWidget.attr("data-col", next.col);
            //this.$addNewNoteWidget.attr("data-row", next.row);\

            // gridsterObj.mutate_widget_in_gridmap(this.$addNewNoteWidget, next.col, next.row);
//          var target = gridsterObj.widgets_in_range(next.col, next.row, next.col, next.row);
//          if(target.attr("data-col") === newView.$el.attr("data-col") && target.attr("data-row") === newView.$el.attr("data-row")) {
//          gridsterObj.swap_widgets(target, this.$addNewNoteWidget);
//          }
            //gridsterObj.manage_movements(this.$addNewNoteWidget, next.col, next.row);
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



        noteRemoved:function(event) {
            if(this.mostRecentlyDeletedView != null) {
                //There was a previously deleted note, lets get rid of it for good
                console.log("Permanently deleting note");
                this.mostRecentlyDeletedView.destroy_full(null);
            }
            //remove the view from our list of views to render
            var index = this.noteViews.indexOf(event);
            if (index > -1) {
                this.noteViews.splice(index, 1);
            }
            this.mostRecentlyDeletedView = event;
            $('#undoAlertHolder').html('<div id="undoAlert" class="alert alert-info alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><span><button class="btn btn-default" id="undoButton">Undo..</button></span></div>');

            this.trigger('gridchange');
        },

        render: function(){
            for (var i = 0; i < this.noteViews.length; i++) {
                this.noteViews[i].render();
            }
            //delete any garbage we have (must be done after remove_all_widgets()
            while(this.garbageViews.length > 0) {
                this.garbageViews.pop().destroy_full(null);
            }

            return this;
        }
    });

    
    
    return NoteGridView;
  // What we return here will be used by other modules
});