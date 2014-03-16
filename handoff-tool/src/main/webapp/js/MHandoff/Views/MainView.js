define([
        'MHandoffCore',
        'jquery',     
        'underscore', 
        'backbone',
        'bootstrap',
        "Views/PatientMasterView",
        ], function(MHandoffCore, $, _, Backbone,Bootstrap, PatientMasterView){

    var MainView = Backbone.View.extend({        

        initialize:function() {
            this.patients = new Array();
            this.$tabs = $("#tabs");
            this.$tabContents = $("#tabContents");
        },

        render : function() {
            this.$tabs.append('<li class="active"><a href="#dashboard"><span class="tab">Dashboard</span></a></li>');
            this.$tabContents.append('<div class="tab-pane fade in active" id="dashboard">Dashboard goes here</div>');
            $('#tabs a').click(function (e) {
                e.preventDefault();
                $(this).tab('show');
            });
                       
            this.addPatientTab("1", "Kyle Kavanagh");
            this.addPatientTab("2", "Minchan Kim");
        },

        addPatientTab : function(patientId, name) {
            var $patientTab = $('<div class="tab-pane fade" id="'+patientId+'"></div>').appendTo(this.$tabContents);
            var $patientNavTabLi = $('<li><a href="#'+patientId+'">'+name+'<button class="close closeTab" id="closeTab" type="button" title="Close patient">×</button></a></li>').appendTo(this.$tabs);
            
            $patientNavTabLi.find("a").click(function (e) {
                e.preventDefault();
                $(this).tab('show');
            });
              
            var theView = new PatientMasterView({patientId:patientId, username:MHandoffCore.loggedInUser.uniqname, el:$patientTab});
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