define([
        'jquery',
        'underscore',
        'backbone'
        ], function($, _, Backbone){

    var priorityLevelToBadge = function(priorityCode) {
        if(priorityCode === 200) {
            return "badge-critical";
        } else if(priorityCode === 150 ) {
            return "badge-high";
        } else if(priorityCode === 100) {
            return "badge-med";
        }else if(priorityCode === 50) {
            return "badge-low";
        } 

        return "";
    };

    return {
        priorityLevelToBadge:priorityLevelToBadge
    };
});