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

    var PatientMasterView = Backbone.View.extend({

        initialize : function (options) {
            this.options = options || {};
            this.patient = options.patient;
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
                collection:this.patient.notesCollection,
                gridsterOpts:{
                    autogenerate_stylesheet: false,
                    widget_margins : [ 12, 12 ],
                    widget_base_dimensions : [ 230, 130 ],
                    min_cols : 3,
                    max_cols : 3,
                    autogrow_cols: true,
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
                collection:this.patient.tasksCollection,
                gridsterOpts:{
                    autogenerate_stylesheet: false,
                    widget_margins : [ 10, 12 ],
                    widget_base_dimensions : [ 230, 120 ],
                    min_cols : 1,
                    max_cols: 1,
                    namespace:"#taskGrid",
                }});

            this.taskGrid.listenTo(this.info, 'filter', this.taskGrid.filter);
            this.noteGrid.listenTo(this.info, 'filter', this.noteGrid.filter);
            
            this.taskGrid.listenTo(this.info, 'filtersReset', this.taskGrid.resetFilters);
            this.noteGrid.listenTo(this.info, 'filtersReset', this.noteGrid.resetFilters);





            return this;
        },       


        destroyView : function() {
            this.undelegateEvents();

            this.$el.removeData().unbind(); 

            this.noteGrid.destroyView();
            this.TaskGrid.destroyView();
            //Clean up our patient model
            delete this.patient.notesCollection;
            delete this.patient.tasksCollection;
            //Remove view from DOM
            this.remove();  
            Backbone.View.prototype.remove.call(this);

        },


    });


    return PatientMasterView;
});