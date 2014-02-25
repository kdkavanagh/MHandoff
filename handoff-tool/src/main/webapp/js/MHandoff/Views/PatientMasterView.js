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

        ], function($, _, Backbone,Bootstrap, TaskCollection,NoteCollection,NoteGridView, noteTile, taskTile, noteModal, taskModal, PatientInfoView){

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
                    widget_margins : [ 10, 10 ],
                    widget_base_dimensions : [ 240, 150 ],
                    min_cols : 3,
                    namespace:"#noteGrid"
                }});


            this.taskGrid = new NoteGridView({el:$("#patientTasks"),
                gridsterID:"#taskGrid",
                templates:{
                    tile:taskTile,
                    modal:taskModal,
                }, 
                collection:new TaskCollection(this.patientId),
                gridsterOpts:{
                    widget_margins : [ 10, 10 ],
                    widget_base_dimensions : [ 240, 150 ],
                    min_cols : 1,
                    max_cols: 1,
                    namespace:"#taskGrid"
                }});





        },
    });


    return PatientMasterView;
});