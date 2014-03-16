define([
        'MHandoffCore',
        'jquery',     
        'underscore', 
        'backbone',
        'bootstrap',
        "Views/PatientMasterView",
        'Views/DashboardView',
        ], function(MHandoffCore, $, _, Backbone,Bootstrap, PatientMasterView, DashboardView){

    var MainView = Backbone.View.extend({        

        initialize:function() {
            this.patients = new Array();
            this.$tabs = $("#tabs");
            this.$tabContents = $("#tabContents");
        },

        render : function() {
            var dashboard = new DashboardView({parent:this, el:$("div#dashboard")}).render();
            $('#tabs a').click(function (e) {
                e.preventDefault();
                $(this).tab('show');
            });
                       
            //this.addPatientTab("1", "Kyle Kavanagh");
            //this.addPatientTab("2", "Minchan Kim");
        },

        addPatientTab : function(patientModel) {
            var $patientTab = $('<div class="tab-pane fade" id="'+patientModel.get("basicInfo").patientId+'"></div>').appendTo(this.$tabContents);
            var $patientNavTabLi = $('<li><a href="#'+patientModel.get("basicInfo").patientId+'">'+patientModel.get("basicInfo").name+'<button class="close closeTab" id="closeTab" type="button" title="Close patient">×</button></a></li>').appendTo(this.$tabs);
            
            $patientNavTabLi.find("a").click(function (e) {
                e.preventDefault();
                $(this).tab('show');
            });
              
            var theView = new PatientMasterView({patient:patientModel, username:MHandoffCore.loggedInUser.uniqname, el:$patientTab});
            var $closeButton = $patientNavTabLi.find("button#closeTab");
            $closeButton.tooltip({ container: 'body'});
            $closeButton.click(function() {
                $closeButton.tooltip('destroy');
                $patientTab.remove();
                $patientNavTabLi.remove();
                $('#tabs a:last').tab('show'); // Select last tab
            });
            
            
            this.patients.push(theView.render());
        }


    });


    return MainView;
});