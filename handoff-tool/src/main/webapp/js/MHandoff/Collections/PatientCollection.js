define([
        // These are path alias that we configured in our bootstrap
        'jquery',     
        'underscore', 
        'backbone',
        'Models/Patient'
        ], function($, _, Backbone, Patient){


    var PatientCollection = Backbone.Collection.extend({
        model:Patient,    
        activeOnly:true,
        
        url : function() {
            return "/dashboard/tiles/list.do?activeOnly="+this.activeOnly;
        }
    });


    return PatientCollection;
});