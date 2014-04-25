define([
        'jquery',
        'text!Views/templates/errorModal.html'
        ], function($, errorModal){    

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
        this.loggedInUser = {};
    };

    MHandoffCore.prototype.showError = function(html, disableExit) {
        var modalContainer = $("#modalErrorContainer");
        modalContainer.html(html);
        if(disableExit) {
            modalContainer.find(".modal").modal({keyboard:false, backdrop:'static'});
        } else {
            modalContainer.find(".modal").modal({keyboard:true, backdrop:true});
        }
    };

    MHandoffCore.prototype.showErrorText = function(text, disableExit) {
        text = text || '<p>MHandoff is having trouble communicating with the server. You can try <a href="/">reloading MHandoff</a><p><p>If you continue to receive this error, please contact MCIT<p>';
        var tmpl = _.template(errorModal); //tmpl is a function that takes a JSON and returns html
        var html = tmpl({text:text});
        this.showError(html, disableExit);

    };

    MHandoffCore.prototype.load = function(callback) {
        var self = this;
        $.getJSON("/backchannel/pull.do", function(data){
            $.extend(self.priorityLevels, data.priorityLevels);
            $.extend(self.taskStatuses, data.taskStatuses);
            $.extend(self.handoffUsers, data.handoffUsers);
            $.extend(self.loggedInUser, data.userInfo);
            
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