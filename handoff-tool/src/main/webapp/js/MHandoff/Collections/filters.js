define([
        'jquery',     
        'moment',
        ], function($,Moment){

    var Filter = function() {};
    
    Filter.createPriorityFilter =  function(sliderMin, sliderMax) {
        return function(noteModel) {
            return (noteModel.get("priorityCode") >= sliderMin && noteModel.get("priorityCode") <= sliderMax);
        };
    };
    
    Filter.createExpirationFilter = function(includeExpired) {
        return function(noteModel) {
            return (includeExpired || noteModel.getExpirationMoment().isAfter(moment()));
        };
    };
    
    Filter.IncludeExpiredNotesFilter = Filter.createExpirationFilter(true);
    Filter.ExcludeExpiredNotesFilter = Filter.createExpirationFilter(false);
    
    Filter.defaultFilters = {
            "priority" : Filter.createPriorityFilter(0, 200),
            "expiration" : Filter.ExcludeExpiredNotesFilter,
      
    };
    
    return Filter;
});