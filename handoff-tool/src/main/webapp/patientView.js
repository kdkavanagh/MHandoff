$(function() {

    function getTodaysDate(plusDays) {
        var today = new Date();
        var dd = today.getDate()+plusDays;
        var mm = today.getMonth()+1; //January is 0!

        var yyyy = today.getFullYear();
        if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = mm+'/'+dd+'/'+yyyy;
        return today;
    }

    var Note = Backbone.Model.extend({
        url:"",
        defaults : {
            noteId : "0",
            priority :"1",
            reporter:"N/A",
            reportedDate:getTodaysDate(0),
            expiration:getTodaysDate(1),
            badgeLevel:"",
            text:"Note text",
        },
    });

    var NoteCollection = Backbone.Collection.extend({
        model : Note,
        url : '/patient/items.do?type=note',
    });

    //Make text inline editable
    $.fn.editable.defaults.mode = 'inline';
    $.fn.editable.defaults.disabled = true;
    $.fn.editable.defaults.onblur='submit';

    var NoteModalView = Backbone.View.extend({

        template:$("#modalNoteTemplate").html(),
        editing :false,
        $editButton:null,
        $editables:null,
        $priorityBadge:null,

        events : {
            'hidden.bs.modal':'destroy_full',
            'click button#editButton' : 'toggleEditing',
        },

        initialize : function (options) {
            this.options = options || {};
            this.noteModel = this.options.noteModel;
            return this;
        },

        render:function() {
            var tmpl = _.template(this.template); //tmpl is a function that takes a JSON and returns html
            this.setElement(tmpl(this.noteModel.toJSON()));

            this.$el.modal('show');
            var self = this;
            this.$el.find("#noteText").editable({
                type: 'textarea',
                pk: 1,
                title: 'Note Text',
                //inputclass:"editable-wysihtml5 input-large",
                success: function (response, newValue) {
                    console.log(newValue);
                    self.noteModel.set("text", newValue);
                },
            });
            this.$el.find("#expiration").editable({
                type:'combodate',
                value: this.noteModel.get("expiration"),
                template:"MM / D / YYYY",
                format:"MM / D / YYYY",
                viewformat:"MM / D / YYYY",
                success: function (response, newValue) {
                    self.noteModel.set("expiration", newValue);
                },
            });
            this.$el.find("#priority").editable({
                type:'select',
                source: [
                         {value: 1, text: 'Priority 1'},
                         {value: 2, text: 'Priority 2'},
                         {value: 3, text: 'Priority 3'},
                         ],
                         success: function (response, newValue) {
                             self.noteModel.set("priority", newValue);
                             if(self.noteModel.get("priority") == 1) {
                                 self.noteModel.set("badgeLevel", "badge-error");
                             } else {
                                 self.noteModel.set("badgeLevel","");
                             }
                             if(self.$priorityBadge == null) {
                                 self.$priorityBadge = self.$el.find("#priorityBadge");
                             }
                             self.$priorityBadge.html("Priority "+newValue);
                             self.$priorityBadge.attr("class", "badge "+self.noteModel.get("badgeLevel")+" pull-right");

                         },
            });
            this.$editButton = this.$el.find("button#editButton");
            this.$editables = this.$el.find(".editable");

        },

        toggleEditing:function() {
            this.$editables.editable('toggleDisabled');
            if(this.editing) {
                //we were editing, set the text back to edit

                this.$editButton.html("Edit");
            } else {
                //we were not editing, change text to done

                this.$editButton.html("Done editing");
            }
            this.editing = !this.editing;
        },

        destroy_full: function(event) {
            console.log("Destroying item");
            this.unbind(); // Unbind all local event bindings
            this.noteModel.unbind( 'change', this.render, this ); // Unbind reference to the model
            this.noteModel.destroy();
            this.options.parent.unbind( 'close:all', this.close, this ); // Unbind reference to the parent view

            this.remove(); // Remove view from DOM

            delete this.$el; // Delete the jQuery wrapped object variable
            delete this.el; // Delete the variable reference to this node

        }


    });

    var IndividualNoteView = Backbone.View.extend({
        tagName: 'li',
        template:$("#indivNoteTemplate").html(),
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
            if(this.noteModel.get("priority") == 1) {
                this.noteModel.set("badgeLevel", "badge-error");
            } else {
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
            console.log("Updating");
            this.$notePriorityBadge.html("Priority "+this.noteModel.get("priority"));
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
            var checker = new checkLength();
            checker.check();
            //maybe set the vertical height of the gridster obj here??
            //var moreThis = this.$el.find('.more');
            //moreThis.popover({content:this.noteModel.get("text")});
        },

        openNote: function() {
            console.log("opening note");
            var modal = new NoteModalView({parent:this,el:$("modalContainer"), noteModel:this.noteModel});
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

    var NoteGridView = Backbone.View.extend({

        el: '.base',
        mostRecentlyDeletedView : null,
        $addNewNoteWidget:null,

        events: {
            'click #buttonPress': "getItems",
            'click #addDummyButton': "addItem",
            'click #undoButton' : "undoRemove",
            'click #addNewTileInner' :"addItem",
        },

        initialize: function () {

            console.log("Creating new view");
            _.bindAll(this, 'render');

            this.notes = new NoteCollection();
            this.notes.fetch({ data: $.param({ patient: "kyle",}) 
                ,reset:true,});
            this.notes.on('reset', this.generateViews, this);
            //this.notes.on('change', this.render);
            this.notes.on('add', this.newItemAdded, this);
            this.noteViews = new Array();
            this.garbageViews = new Array();
        },

        createView: function(note, row, col, self) {
            var gridsterObj = $("#noteGrid ul").gridster().data('gridster');
            var noteView = new IndividualNoteView({parent : self, noteModel:note, row:row, col:col, gridster : gridsterObj});
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
            var note = new Note();
            this.notes.add(note);
        },

        newItemAdded:function(note) {
            //get the next free position
            var gridsterObj = $("#noteGrid ul").gridster().data('gridster');

            //Move the add new note item to the next free position
            //This is safe because the space is guarenteed to be empty
            var newView = this.createView(note, 0, 0, this).render();
            newView.openNote().toggleEditing();
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

        },

        render: function(){
            var gridsterObj = $("#noteGrid ul").gridster().data('gridster');
            var addNewItemHtml="<div class=\"note addNewTile\"><div id=\"addNewTileInner\"><span class=\"glyphicon glyphicon-plus addNewTileIcon\"></span>Add New Item</div><div>";
            gridsterObj.remove_all_widgets();

            for (var i = 0; i < this.noteViews.length; i++) {
                this.noteViews[i].render();
            }
            this.$addNewNoteWidget= gridsterObj.add_widget(addNewItemHtml);

            //delete any garbage we have (must be done after remove_all_widgets()
            while(this.garbageViews.length > 0) {
                this.garbageViews.pop().destroy_full(null);
            }

            return this;
        }
    });


    function checkLength() {
        this.showing = new Array();
    }

    checkLength.prototype.check = function() {
        //Check to see if we need the "more" text
        var that = this;
        $('.noteTextArea').each(function (index) {
            var article = $(this);
            var theP = article.find('p');
            var theMore = article.find('.more');
            //Attach a popover to theMore
            if(theP[0].scrollHeight >= $(this).height()) {
                theMore.show();
                that.showing[index] = true;
            } else {
                if (!article.hasClass('active')) {
                    theMore.hide();

                    that.showing[index] = false;
                } else {
                    that.showing[index] = false;

                }
            }
            theMore.text(that.showing[index] ? "More..." : "Less...");
        });
    };



    var view = new NoteGridView();

});
