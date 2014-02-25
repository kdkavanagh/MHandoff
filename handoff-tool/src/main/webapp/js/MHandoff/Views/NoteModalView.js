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

], function($, _, Backbone,Bootstrap,Moment, Bootstrap_editable, Note, NoteCollection){
    
    
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
            return this;
        },

        render:function() {
            _.template.formatdate = function (stamp, convert) {
                var d = new Date(stamp*1000), // or d = new Date(date)
                    fragments = [
                        d.toDateString(),
                        d.toLocaleTimeString(),

                    ]; 
                return fragments.join(' at ');
            };
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
                    console.log(newValue);
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
                template:"D MMM YYYY  hh:mm A",
                success: function (response, newValue) {
                    self.noteModel.set("expiration", newValue);
                },
            });
            this.$el.find("a#priority").editable({
                type:'select',
                disabled:true,
                mode:'inline',
                onblur:'submit',
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