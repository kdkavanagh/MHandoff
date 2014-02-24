define([
  // These are path alias that we configured in our bootstrap
  'jquery',     
  'underscore', 
  'backbone',
  'bootstrap',
  'moment',
  'bootstrap_editable',
  'Models/Note',
  "Collections/NoteCollection",
  'text!Views/templates/noteModal.html'
], function($, _, Backbone,Bootstrap,Moment, Bootstrap_editable, Note, NoteCollection, noteTemplate){
    
    $.fn.editable.defaults.mode = 'inline';
    $.fn.editable.defaults.disabled = true;
    $.fn.editable.defaults.onblur='submit';
    var NoteModalView = Backbone.View.extend({

        template:noteTemplate,
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

    
    
    return NoteModalView;
});