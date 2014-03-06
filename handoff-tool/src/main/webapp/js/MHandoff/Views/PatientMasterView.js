define([
        // These are path alias that we configured in our bootstrap
        'jquery',     
        'underscore', 
        'backbone',
        'bootstrap',
        "Collections/TaskCollection",
        "Collections/NoteCollection",
        'Views/NoteGridView',
        'text!Views/templates/noteTile.html',
        'text!Views/templates/taskTile.html',
        'text!Views/templates/noteModal.html',
        'text!Views/templates/taskModal.html',
        "Views/PatientInfoView",
        'text!Views/templates/patientInfoModal.html',
        'text!Views/templates/patientMasterTemplate.html',


        ], function($, _, Backbone,Bootstrap, TaskCollection,NoteCollection,NoteGridView, noteTile, taskTile, noteModal, taskModal, PatientInfoView, patientInfoModal, patientMasterTemplate){

    function equalHeight(group) {
        tallest = 0;
        group.each(function() {
            thisHeight = $(this).height();
            console.log("Height "+thisHeight);
            if(thisHeight > tallest) {
                tallest = thisHeight;
            }
        });
        //group.height(tallest);
        return tallest;
    }


    var PatientMasterView = Backbone.View.extend({

        patientId:null,

        initialize : function (options) {
            this.options = options || {};
            this.patientId = this.options.patientId;
            this.username = this.options.username;
            this.taskCollection = new TaskCollection(this.username, this.patientId);
            this.noteCollection = new NoteCollection(this.username, this.patientId);
            return this;
        },

        render : function() {
            this.$el.html(patientMasterTemplate);
            this.info = new PatientInfoView({el:this.$el.find("#patientInfo")});

            this.noteGrid = new NoteGridView({el:this.$el.find("#patientNotes"),
                gridsterID:"#noteGrid", 
                templates:{
                    tile:noteTile,
                    modal:noteModal,
                }, 
                collection:this.noteCollection,
                gridsterOpts:{
                    widget_margins : [ 12, 12 ],
                    widget_base_dimensions : [ 230, 130 ],
                    min_cols : 3,
                    namespace:"#noteGrid",
                    resize: {
                        enabled: true,
                        max_size: [2, 2],
                        min_size: [1, 1]
                      }
                }});



            this.taskGrid = new NoteGridView({el:this.$el.find("#patientTasks"),
                gridsterID:"#taskGrid",
                templates:{
                    tile:taskTile,
                    modal:taskModal,
                }, 
                collection:this.taskCollection,
                gridsterOpts:{
                    widget_margins : [ 10, 12 ],
                    widget_base_dimensions : [ 230, 120 ],
                    min_cols : 1,
                    max_cols: 1,
                    namespace:"#taskGrid",
                }});
            var self = this;
            var sliderMin =0; sliderMax=200;
            this.$el.find("#filterSlider").on('slide', function(e){
                //only filter if we need to
                if(sliderMin !== e.value[0] || sliderMax !==e.value[1]) {
                    self.noteGrid.filter(self.createPriorityFilter( e.value[0], e.value[1]));
                    self.taskGrid.filter(self.createPriorityFilter( e.value[0], e.value[1]));
                    sliderMin = e.value[0];
                    sliderMax = e.value[1];
                }
                
            });
            
            
            return this;
        },
        
        //Returns a function that takes in the notemodel as an arg and returns a bool with whether or not the item is out-of-bounds
        createPriorityFilter:function(sliderMin, sliderMax) {
            return function(noteModel) {
                return (noteModel.get("priorityCode") < sliderMin || noteModel.get("priorityCode") > sliderMax);
            };
        },
        
       
        
        destroyView : function() {
            this.undelegateEvents();

            this.$el.removeData().unbind(); 
            
            this.noteGrid.destroyView();
            this.TaskGrid.destroyView();
            //Remove view from DOM
            this.remove();  
            Backbone.View.prototype.remove.call(this);

        },


    });


    return PatientMasterView;
});