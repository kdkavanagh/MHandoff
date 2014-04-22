define([
        'MHandoffCore',
        'jquery',     
        'underscore', 
        'backbone',
        'bootstrap',
        "Views/PatientMasterView",
        'Views/DashboardView'
        ], function(MHandoffCore, $, _, Backbone,Bootstrap, PatientMasterView, DashboardView){

    var MainView = Backbone.View.extend({        

        initialize:function() {
            this.patients = [];
            this.$tabs = $("#tabs");
            this.$tabContents = $("#tabContents");
            this.visiblePatients = {};
        },

        render : function() {
            var dashboard = new DashboardView({parent:this, el:$("div#dashboard")}).render();
            $('#tabs a').click(function (e) {
                e.preventDefault();
                $(this).tab('show');
                if(dashboard.isotopeObj !== null) {
                    console.log("Isotope Relayout");
                  //Delay generating views till Isotope has loaded (shitty fix)
                    setTimeout(function() {
                        dashboard.isotopeObj.layout();
                    }, 250);
                
                } 
            });
                       
            //this.addPatientTab("1", "Kyle Kavanagh");
            //this.addPatientTab("2", "Minchan Kim");
        },

        addPatientTab : function(patientModel) {

            var $patientTab = $('<div class="tab-pane fade" id="'+patientModel.get("basicInfo").patientId+'"></div>').appendTo(this.$tabContents);
            var $patientNavTabLi = $('<li><a href="#'+patientModel.get("basicInfo").patientId+'">'+patientModel.get("basicInfo").name+'<button class="close closeTab" id="closeTab" type="button" title="Close patient">×</button></a></li>').appendTo(this.$tabs);
            
            var theView = new PatientMasterView({patient:patientModel, username:MHandoffCore.loggedInUser.uniqname, el:$patientTab});
            $patientNavTabLi.find("a").click(function (e) {
                e.preventDefault();
                $(this).tab('show');
                //may need to relayout the grids here
            });
              
            
            var $closeButton = $patientNavTabLi.find("button#closeTab");
            $closeButton.tooltip({ container: 'body'});
            $closeButton.click(function() {
                $closeButton.tooltip('destroy');
                $patientTab.remove();
                $patientNavTabLi.remove();
                delete patientModel.$tabObject;
                
                $('#tabs a:last').tab('show'); // Select last tab
                theView.destroyView();
            });
            

            patientModel.$tabObject = $patientNavTabLi.find("a");
           
            
            patientModel.$tabObject.tab('show');
            this.patients.push(theView.render());
        }


    });


    return MainView;
});