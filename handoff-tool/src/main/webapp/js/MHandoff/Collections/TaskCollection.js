define([
        // These are path alias that we configured in our bootstrap
        'jquery',     
        'underscore', 
        'backbone',
        'Models/Task',
        'utils',

        ], function($, _, Backbone, Task, Utils){


    var TaskCollection = Backbone.Collection.extend({
        model:Task,
        itemType:"task",
        patientId:null,

        initialize: function(patientId) {
            this.patientId = patientId;
        },


        url : function() {
            return "/patient/items.do?type=" + this.itemType+"&patient="+this.patientId;
        },
    });


    return TaskCollection;
});