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


        ], function($, _, Backbone,Bootstrap, TaskCollection,NoteCollection,NoteGridView, noteTile, taskTile, noteModal, taskModal, PatientInfoView, patientInfoModal){

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
            return this;
        },

        render : function() {

            this.info = new PatientInfoView({el:$("#patientInfo")});


            this.noteGrid = new NoteGridView({el:$("#patientNotes"),
                gridsterID:"#noteGrid", 
                templates:{
                    tile:noteTile,
                    modal:noteModal,
                }, 
                collection:new NoteCollection(this.patientId),
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



            this.taskGrid = new NoteGridView({el:$("#patientTasks"),
                gridsterID:"#taskGrid",
                templates:{
                    tile:taskTile,
                    modal:taskModal,
                }, 
                collection:new TaskCollection(this.patientId),
                gridsterOpts:{
                    widget_margins : [ 10, 12 ],
                    widget_base_dimensions : [ 230, 120 ],
                    min_cols : 1,
                    max_cols: 1,
                    namespace:"#taskGrid",
                }});
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