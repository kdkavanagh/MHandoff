define([
        // These are path alias that we configured in our bootstrap
        'require',
        'jquery',     
        'underscore', 
        'backbone',
        'bootstrap',
        'moment',
        'bootstrap_editable',
        'Models/Note',
        "Collections/NoteCollection",

        ], function(require, $, _, Backbone,Bootstrap,Moment, Bootstrap_editable, Note, NoteCollection){


    var NoteModalView = Backbone.View.extend({

        template:null,
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
            this.template = this.options.template;
            this.MHandoff = require("MHandoff");
            var self = this;
            _.template.formatdate = function (stamp) {
                return moment(stamp *1000).format('MMM Do YYYY, h:mm A');
            };
            _.template.getPriorityStringFromCode = function (code) {
                return self.MHandoff.priorityLevels[code];
            };
            
            _.template.getTaskStatusStringFromCode = function (code) {
                return self.MHandoff.taskStatuses[code];
            };
            _.template.getUser = function(user) {
                return self.MHandoff.handoffUsers[user];
            };
            return this;
        },

        render:function() {
            var tmpl = _.template(this.template); //tmpl is a function that takes a JSON and returns html
            this.setElement(tmpl(this.noteModel.toJSON()));
            this.$el.modal('show');
            var self = this;
            this.$el.find("a#noteText").editable({
                type: 'textarea',
                pk: 1,
                title: 'Note Text',
                disabled:true,
                mode:'inline',
                onblur:'submit',
                //inputclass:"editable-wysihtml5 input-large",
                success: function (response, newValue) {
                    self.noteModel.set("text", newValue);
                },
            });
            this.$el.find("a#expiration").editable({
                type:'combodate',
                disabled:true,
                mode:'inline',
                onblur:'submit',
                value: moment.unix(this.noteModel.get("expiration")),
                format:"X",
                viewformat:"MMM D, YYYY, hh:mm A",
                template:"MMM D YYYY  hh:mm A",
                success: function (response, newValue) {
                    self.noteModel.set("expiration", newValue/1000);
                },
            });
            this.$el.find("a#priority").editable({
                type:'select',
                disabled:true,
                mode:'inline',
                onblur:'submit',
                source: this.MHandoff.priorityLevels,
                showbuttons: false,
                success: function (response, newValue) {
                    console.log(newValue);
                    self.noteModel.set("priorityCode", newValue);
                    var text = self.MHandoff.priorityLevels[newValue];
                    self.noteModel.set("priority",  _.template.getPriorityStringFromCode(newValue));
                    if(newValue == 200) {
                        self.noteModel.set("badgeLevel", "badge-error");
                    } else if(newValue == 150 ) {
                        self.noteModel.set("badgeLevel", "badge-warning");
                    }
                    else {
                        self.noteModel.set("badgeLevel","");
                    }
                    if(self.$priorityBadge == null) {
                        self.$priorityBadge = self.$el.find("#priorityBadge");
                    }
                    self.$priorityBadge.html(text);
                    self.$priorityBadge.attr("class", "badge "+self.noteModel.get("badgeLevel")+" pull-right");

                },
            });

            var $taskStatus = this.$el.find("a#status");
            if($taskStatus.length !== 0) {
                //We have a task status field
                $taskStatus.editable({
                    type:'select',
                    disabled:true,
                    mode:'inline',
                    onblur:'submit',
                    showbuttons: false ,
                    source: this.MHandoff.taskStatuses,
                    success: function (response, newValue) {
                        self.noteModel.set("status", newValue);
                    },
                });
            }
            
            var $taskAssignee = this.$el.find("a#assignee");
            if($taskAssignee.length !== 0) {
                //We have a task status field
                $taskAssignee.editable({
                    type:'select',
                    disabled:true,
                    mode:'inline',
                    onblur:'submit',
                    showbuttons: false ,
                    source: this.MHandoff.handoffUsers,
                    success: function (response, newValue) {
                        self.noteModel.set("assignee", newValue);
                    },
                });
            }

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



    return NoteModalView;
});