define([
        'jquery',
        'underscore',
        'backbone',
        'bootstrap',
        'router', // Request router.js
        'stream',
        'text!Views/templates/errorModal.html',
        'MHandoffCore'
        ], function($, _, Backbone,Bootstrap, Router, stream, errorModal, MHandoffCore){    


    var initialize = function(){
        // Pass in our Router module and call it's initialize function
        console.log("Initializing MHandoff");
        _.template.formatdate = function (stamp) {
            return moment(stamp *1000).format('ddd, MMM Do YYYY') + ' at ' + moment(stamp *1000).format('h:mma');
        };
        _.template.formatdate_noTime = function (stamp) {
            return moment(stamp *1000).format('ddd, MM/DD/YY');
        };

        $("#logoutLink").click(function() {
            MHandoffCore.logout();
        });
        $( document ).ajaxError(function( event, jqxhr, settings, exception ) {
            var modalContainer = $("#modalContainer");
            modalContainer.html(errorModal);
            modalContainer.find(".modal").modal({keyboard:false});
            console.log("AJAX error");
            console.log(event);
       });
        MHandoffCore.load(function() {

            _.template.getPriorityStringFromCode = function (code) {
                return MHandoffCore.getPriorityDisplayName(code);
            };

            _.template.getTaskStatusStringFromCode = function (code) {
                return MHandoffCore.getTaskStatusDisplayName(code);
            };
            _.template.getUser = function(user) {
                return MHandoffCore.getUserDisplayName(user);
            };

            $("#username").html(MHandoffCore.loggedInUser.first + " "+  MHandoffCore.loggedInUser.last);
            Router.initialize();
            stream.connect();

        });
    };

    return {
        initialize: initialize,
    };
});