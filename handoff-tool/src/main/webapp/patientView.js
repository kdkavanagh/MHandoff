$(function() {

    var Note = Backbone.Model.extend({
        url:"",
        defaults : {
            noteId : "0",
            priority :"1",
            reporter:"N/A",
            badgeLevel:"",
        },
    });

    var NoteCollection = Backbone.Collection.extend({
        model : Note,
        url : '/patient/items.do?type=note',
    });

    //Make text inline editable
    $.fn.editable.defaults.mode = 'inline';
    
    var NoteModalView = Backbone.View.extend({

        template:$("#modalNoteTemplate").html(),
        editing :false,
        $editButton:null,
        $editables:null,
        
        events : {
            'hidden.bs.modal':'destroy_full',
            'click button#editButton' : 'toggleEditing',
        },

        initialize : function (options) {
            this.options = options || {};
            this.noteModel = this.options.noteModel;
            this.noteModel.on('change', this.render, this);
            return this;
        },
        
        render:function() {
            var tmpl = _.template(this.template); //tmpl is a function that takes a JSON and returns html
            this.setElement(tmpl(this.noteModel.toJSON()));
            
            this.$el.modal('show');

            this.$el.find("#noteText").editable({
                type: 'text',
                pk: 1,
                title: 'Note Text',
                disabled : true,
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
                this.$editButton.html("Done");
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
                console.log("setting");
                this.noteModel.set("badgeLevel", "badge-error");
            }
            this.noteModel.on('change', this.render, this);
            return this;
        },

        render: function(){

            var tmpl = _.template(this.template); //tmpl is a function that takes a JSON and returns html
            this.setElement(tmpl(this.noteModel.toJSON()));
            this.check();
            this.gridster.add_widget(this.el);
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
        },

        buttonClickHandler : function(event){
            console.log("Removing...");
            //this.noteModel.destroy();
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

        events: {
            'click #buttonPress': "getItems",
            'click #addDummyButton': "addItem",
            'click #undoButton' : "undoRemove",
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
            var note = new Note({text:"My dummy note",});
            this.notes.add(note);
        },

        newItemAdded:function(note) {
            this.createView(note, 0, 0, this).render();
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
            gridsterObj.remove_all_widgets();

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
