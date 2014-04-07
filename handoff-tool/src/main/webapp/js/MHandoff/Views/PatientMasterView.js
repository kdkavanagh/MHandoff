define([
        // These are path alias that we configured in our bootstrap
        'jquery',     
        'underscore', 
        'backbone',
        'bootstrap',
        'Models/Patient',
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
        'backbone_hotkeys',
        'keymaster',
	'isotope',
        ], function($, _, Backbone, Bootstrap, Patient, TaskCollection, NoteCollection,NoteGridView, noteTile, taskTile, noteModal, taskModal, PatientInfoView, patientInfoModal, patientMasterTemplate, Backbone_hotkeys, Keymaster, Isotope){

    var PatientMasterView = Backbone.View.extend({


        initialize : function (options) {
            this.options = options || {};
            this.patient = options.patient;
            this.patientModel = options.patientModel;
            return this;
        },

        render : function() {
            this.$el.html(patientMasterTemplate);
            console.log(this.$el.find("#patientInfo"));
            this.info = new PatientInfoView({el:this.$el.find("#patientInfo")});
            this.noteGrid = new NoteGridView({el:this.$el.find("#patientNotes"),
                gridId:"#noteGrid", 
                templates:{
                    tile:noteTile,
                    modal:noteModal,
                }, 
                collection:this.patient.notesCollection,
            });

            this.taskGrid = new NoteGridView({el:this.$el.find("#patientTasks"),
                gridId:"#taskGrid",
                templates:{
                    tile:taskTile,
                    modal:taskModal,
                }, 
                collection:this.patient.tasksCollection,
            });

            this.taskGrid.listenTo(this.info, 'filter', this.taskGrid.filter);
            this.noteGrid.listenTo(this.info, 'filter', this.noteGrid.filter);

            this.taskGrid.listenTo(this.info, 'filtersReset', this.taskGrid.resetFilters);
            this.noteGrid.listenTo(this.info, 'filtersReset', this.noteGrid.resetFilters);

            this.listenTo(this, 'addItem', this.noteGrid.addItem);

            return this;
        },       

        destroyView : function() {
            this.undelegateEvents();

            this.$el.removeData().unbind(); 

            this.noteGrid.destroyView();
            this.taskGrid.destroyView();
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
