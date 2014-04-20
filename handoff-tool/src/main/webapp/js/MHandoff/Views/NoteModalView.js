define([
        // These are path alias that we configured in our bootstrap
        'MHandoffCore',
        'jquery',     
        'underscore', 
        'backbone',
        'bootstrap',
        'moment',
        'bootstrap_editable',
        'utils',
        'Models/Note',
        "Collections/NoteCollection",

        ], function(MHandoffCore, $, _, Backbone,Bootstrap,Moment, Bootstrap_editable,Utils, Note, NoteCollection){

    var NoteModalView = Backbone.View.extend({

        template: null,
        $saveButton: null,
        $editables: null,
        $priorityBadge: null,
        tempModel: {},

        events : {
            'click button#saveButton' : 'saveItem',
            'click button#expireNow' : 'expireNoteNow',
            'hidden.bs.modal':'destroy_full',
        },

        initialize : function (options) {
            _.bindAll(this, 'render', 'saveItem');
            this.options = options || {};
            this.noteModel = this.options.noteModel;
            this.template = this.options.template;   
            this.tempModel = {};
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
                disabled: false,
                showbuttons: false,
                mode:'inline',
                onblur:'submit',
                success: function (response, newValue) {
                    self.tempModel.text = newValue;
                    
                    // this.$noteText.trigger('blur');
                    // self.noteModel.set("text", newValue);
                },
            });
            var expir = this.$el.find("a#expiration");
            var myFormat = "MMM D, YYYY, hh:mm A";
            expir.editable({
                type:'combodate',
                disabled: false,
                showbuttons: false,
                mode:'inline',
                onblur:'submit',
                combodate:{minuteStep:15},
                
                value:moment.utc(self.noteModel.get("expiration")*1000).local().format(myFormat),
                format:myFormat,
                viewformat:myFormat,
                template:myFormat,
                success: function (response, newValue) {
                    var m = moment(newValue, myFormat);
                    //convert new value to UTC
                    self.tempModel.expiration = m.unix();
                    //self.noteModel.set("expiration", newValue/1000);
                },
            });
            var $expireNowButton = $(self.$el.find("button#expireNow"));
            $(expir).click(function() {
                //hide our expireNow button
                $expireNowButton.hide();
            });
            $(expir).on('hidden', function(e, reason) {
                $expireNowButton.show();
            });
            
            
            this.$el.find("a#priority").editable({
                type: 'select',
                disabled: false,
                mode: 'inline',
                onblur: 'submit',
                source: MHandoffCore.priorityLevels,
                showbuttons: false,
                value:self.noteModel.get('priorityCode'),
                success: function (response, newValue) {
                    self.tempModel.priorityCode = newValue;
                    self.tempModel.priority = _.template.getPriorityStringFromCode(newValue);
                    self.tempModel.badgeLevel = Utils.priorityLevelToBadge(newValue);
                    // self.noteModel.set("priorityCode", newValue);                    
                    // self.noteModel.set("priority",  _.template.getPriorityStringFromCode(newValue));
                    // self.noteModel.set("badgeLevel", Utils.priorityLevelToBadge(newValue));

                    self.$priorityBadge.html(self.tempModel.priority);
                    self.$priorityBadge.attr("class", "badge "+self.tempModel.badgeLevel+" pull-right");
                    

                },
            });
            var $taskAssignee = this.$el.find("a#assignee");
            if($taskAssignee.length !== 0) {
                //We have a task status field
                $taskAssignee.editable({
                    type:'select',
                    disabled:false,
                    mode:'inline',
                    onblur:'submit',
                    showbuttons: false ,
                    source: MHandoffCore.handoffUsers,
                    value:self.noteModel.get('assignee'),
                    success: function (response, newValue) {
                        self.tempModel.assignee = newValue;
                        
                        //self.noteModel.set("assignee", newValue);
                    },
                });
            }

            var $taskStatus = this.$el.find("a#status");
            if($taskStatus.length !== 0) {
                //We have a task status field
                $taskStatus.editable({
                    type:'select',
                    disabled:false,
                    mode:'inline',
                    onblur:'submit',
                    showbuttons: false ,
                    source: MHandoffCore.taskStatuses,
                    value:self.noteModel.get('status'),
                    success: function (response, newValue) {
                        self.tempModel.status = newValue;
                        
                        //self.noteModel.set("status", newValue);
                    },
                });
            }


            this.$saveButton = this.$el.find("button#saveButton");
            this.$closeButton = this.$el.find("button#closeButton");
            this.$editables = this.$el.find(".editable");
            this.$priorityBadge = this.$el.find("#priorityBadge");
            this.$noteText = this.$el.find("#noteText");
        },
        
        expireNoteNow:function() {
            var obj = this.$el.find("a#expiration");
            var unix = moment().format("MMM D, YYYY, hh:mm A");
            obj.editable('setValue', unix, true);
            //call success method because setValue doesnt, and I dont wanna edit the xeditable code
            $(obj).data('editable').options.success(null, unix);
            //TODO: Investigate why submit() doesnt work (it doesnt seem to call success() with newValue, but idk)
        },

        saveItem:function() {
            console.log("Saving item");
             this.$el.modal('hide');
            // this.$el.find("a#noteText").trigger('blur');
            // this.$el.find("a#noteText").blur();
            // this.trigger('blur');
            // $('a').trigger('blur');
            
            console.log(this.tempModel);
            this.noteModel.save(this.tempModel);            
            this.tempModel = {};
            
            
            this.trigger('noteSaved');
            // this.destroy_full();
        },

        destroy_full: function(event) {
            console.log("Destroying item");
            this.unbind(); // Unbind all local event bindings
            this.noteModel.unbind( 'change', this.render, this ); // Unbind reference to the model
            this.options.parent.unbind( 'close:all', this.close, this ); // Unbind reference to the parent view
            this.remove(); // Remove view from DOM

            delete this.$el; // Delete the jQuery wrapped object variable
            delete this.el; // Delete the variable reference to this node
        }
    });

    return NoteModalView;
});