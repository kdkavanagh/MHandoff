define([
        'jquery',
        'underscore',
        'backbone',
        'bootstrap',
        'router', // Request router.js
        'text!Views/templates/errorModal.html',
        ], function($, _, Backbone,Bootstrap, Router, errorModal){


    var priorityLevels = {};
    var taskStatuses={};
    var handoffUsers={};

    var initialize = function(){
        // Pass in our Router module and call it's initialize function
        _.template.formatdate = function (stamp) {
            return moment(stamp *1000).format('MMM Do YYYY, h:mm A');
        };
        _.template.getPriorityStringFromCode = function (code) {
            return priorityLevels[code];
        };

        _.template.getTaskStatusStringFromCode = function (code) {
            return taskStatuses[code];
        };
        _.template.getUser = function(user) {
            return handoffUsers[user];
        };

        $.getJSON("/backchannel/pull.do", function(data){
            //Load the priority levels 
            //Have to use for loop since we export a pointer to the priorityLevel obj and we cant change that
            for( var key in data.priorityLevels )
                priorityLevels[ key ] = data.priorityLevels[ key ];

            for( var key in data.taskStatuses )
                taskStatuses[ key ] = data.taskStatuses[ key ];

            for( var key in data.handoffUsers )
                handoffUsers[ key ] = data.handoffUsers[ key ];


            Router.initialize();
        }).error(function() { 
            var tmpl = _.template(errorModal); //tmpl is a function that takes a JSON and returns html
            $("#modalContainer").html(tmpl({text:"Failed to connect to MHandoff server"}));
            $("#modalContainer").modal();
        });



    };

    return {
        initialize: initialize,
        priorityLevels:priorityLevels,
        taskStatuses:taskStatuses,
        handoffUsers:handoffUsers,
    };
});