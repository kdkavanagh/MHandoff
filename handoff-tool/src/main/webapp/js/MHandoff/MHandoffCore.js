define([
        'jquery',
        ], function($){    

    var MHandoffCore = function() {
        this.priorityLevels = {};
        this.taskStatuses = {};
        this.handoffUsers = {};
        this.loggedInUser = {};
    };

    MHandoffCore.prototype.logout = function() {
        $.ajax( "/logout" )
        .always(function() {
            location.reload();
        });
        loggedInUser = {};
    };

    MHandoffCore.prototype.load = function(callback) {
        var self = this;
        $.getJSON("/backchannel/pull.do", function(data){
            for( var key in data.priorityLevels )
                self.priorityLevels[ key ] = data.priorityLevels[ key ];

            for( var key in data.taskStatuses )
                self.taskStatuses[ key ] = data.taskStatuses[ key ];

            for( var key in data.handoffUsers )
                self.handoffUsers[ key ] = data.handoffUsers[ key ];

            for( var key in data.userInfo )
                self.loggedInUser[ key ] = data.userInfo[ key ];
            
            if(callback !== undefined) {
                callback();
            }

        });
    };
    
    MHandoffCore.prototype.getUserDisplayName = function(user) {
        return this.handoffUsers[user];
    };
    
    MHandoffCore.prototype.getPriorityDisplayName = function(priorityCode) {
        return this.priorityLevels[priorityCode];
    };
    
    MHandoffCore.prototype.getTaskStatusDisplayName = function(taskCode) {
        return this.taskStatuses[taskCode];
    };
    
    var obj = new MHandoffCore();

    return obj;
      
});