define([
        // These are path alias that we configured in our bootstrap
        'jquery',     
        'underscore', 
        'backbone',
        'bootstrap',
        "Views/PatientMasterView",
        ], function($, _, Backbone,Bootstrap, PatientMasterView){

    var MainView = Backbone.View.extend({        
        events: {
            'click button#addPatient' : "openNote", 
        },

        initialize:function() {
            this.patients = new Array();
            this.$tabs = $("#tabs");
            this.$tabContents = $("#tabContents");
        },

        render : function() {


            this.$tabs.append('<li><a href="#dashboard"><span class="tab">Dashboard</span></a></li>');
            this.$tabContents.append('<div class="tab-pane" id="dashboard">Dashboard goes here</div>');
            this.addPatientTab("1", "Kyle Kavanagh");
            this.addPatientTab("2", "Minchan Kim");
            $('#tabs a').click(function (e) {
                e.preventDefault();
                $(this).tab('show');
            });

        },

        addPatientTab : function(patientId, name) {
            this.$tabs.append('<li><a href="#'+patientId+'"><span class="tab">'+name+'</span></a></li>');
            this.$tabContents.append('<div class="tab-pane" id="'+patientId+'"></div>');
            var $patientTab = $("#"+patientId);
            $patientTab.click(function (e) {
                e.preventDefault();
                $(this).tab('show');
            });
            this.patients.push(new PatientMasterView({patientId:patientId, el:$patientTab}).render());
        }


    });


    return MainView;
});