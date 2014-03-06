define([
        'jquery',
        'underscore',
        'backbone',
        'bootstrap',
        'router', // Request router.js
        'stream',
        'text!Views/templates/errorModal.html',
        ], function($, _, Backbone,Bootstrap, Router,Stream, errorModal){


    var priorityLevels = {};
    var taskStatuses={};
    var handoffUsers={};
    var loggedInUser={};
    
    var stream;

    var initialize = function(){
        // Pass in our Router module and call it's initialize function
        console.log("Initializing MHandoff");
        _.template.formatdate = function (stamp) {
            return moment(stamp *1000).format('ddd, MMM Do YYYY, h:mm A');
        };
        _.template.formatdate_noTime = function (stamp) {
            return moment(stamp *1000).format('ddd, MM/DD/YY');
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
        
//        $(document).bind('keyup', function(e) {
//            console.log(e.type, e.keyCode);
//        });
        
        //Bind logout functionality
        $("#logoutLink").click(function() {
            $.ajax( "/logout" )
            .always(function() {
              location.reload();
            });
        });

        $.getJSON("/backchannel/pull.do", function(data){
            //Load the priority levels 
            //Have to use for loop since we export a pointer to the priorityLevel obj and we cant change that
            for( var key in data.priorityLevels )
                priorityLevels[ key ] = data.priorityLevels[ key ];

            for( var key in data.taskStatuses )
                taskStatuses[ key ] = data.taskStatuses[ key ];

            for( var key in data.handoffUsers )
                handoffUsers[ key ] = data.handoffUsers[ key ];
            
            for( var key in data.userInfo )
                loggedInUser[ key ] = data.userInfo[ key ];
            
            $("#username").html(loggedInUser.first + " "+  loggedInUser.last);

            //stream  = new Stream();
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
        loggedInUser:loggedInUser,
        stream : function() {return stream},
    };
});