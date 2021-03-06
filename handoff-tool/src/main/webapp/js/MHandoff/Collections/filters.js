define([
        'jquery',     
        'moment',
        'Models/Note'
        ], function($,Moment, NoteModel){

    var dateSortPackage = {
            sortBy:'date',
            sortAscending:false
    };

    var prioritySortPackage = {
            sortBy:'priority',
            sortAscending:false
    };

    var Filter = function(name, filterFn) {
        this.name = name;
        this.filterFn = filterFn;
    };

    Filter.priorityCache= {};
    
    var CompoundFilter = function() {
        this.filters = {};
        this.sortPackage = prioritySortPackage;
    };
    
    CompoundFilter.prototype.sortByDate = function() {
        this.sortPackage = dateSortPackage;
        return this;
    };
    
    CompoundFilter.prototype.sortByPriority = function() {
        this.sortPackage = prioritySortPackage;
        return this;
    };
    
    CompoundFilter.prototype.addFilter = function(filter) {
        this.filters[filter.name] = filter.filterFn;
        return this;
    };

    CompoundFilter.prototype.removeFilter = function(filter) {
        delete this.filters[filter.name];
        return this;
    };

    CompoundFilter.prototype.hasFilter = function(filter) {
        return this.filters[filter.name] !== undefined  && this.filters[filter.name] !== null && this.filters[filter.name] ===filter.filterFn;
    };

    CompoundFilter.prototype.toString = function() {
        var s = "{ ";
        $.each( this.filters, function( key, value ) {
            s = s + " "+key;
        });
        s = s+"}";
        return s;
    };

    /**
     * Returns true if noteModel passes all filters
     * @param noteModel
     */
    CompoundFilter.prototype.filter = function(noteModel) {
        var key;
        for (key in this.filters) {

            if(!this.filters[key](noteModel)) {
                //Doesnt pass the filter
                return false;
            }
        }
        return true;
    };

    Filter.createPriorityFilter =  function(sliderMin, sliderMax) {
        //Check if weve already created this filter
        if(Filter.priorityCache.hasOwnProperty(sliderMin) && Filter.priorityCache[sliderMin].hasOwnProperty(sliderMax)) {
            //We have it in the cache
            return Filter.priorityCache[sliderMin][sliderMax];
        } else {
            //We need to create/cache a filter
            var obj = new Filter("priority", function(noteModel) {
                return (noteModel.get("priorityCode") >= sliderMin && noteModel.get("priorityCode") <= sliderMax);
            });

            if(!Filter.priorityCache.hasOwnProperty(sliderMin)){
                Filter.priorityCache[sliderMin] = {}; // must initialize the sub-object, otherwise will get 'undefined' errors
            }
            Filter.priorityCache[sliderMin][sliderMax] = obj;
            return obj;
        }
    };

    Filter.createExpirationFilter = function(includeExpired) {
        return new Filter("expiration", function(noteModel) {
            return (includeExpired || noteModel.getExpirationMoment().isAfter(moment()));
        });

    };

    Filter.IncludeExpiredNotesFilter = Filter.createExpirationFilter(true);
    Filter.ExcludeExpiredNotesFilter = Filter.createExpirationFilter(false);
    Filter.DefaultPriorityFilter = Filter.createPriorityFilter(0, 200);
    CompoundFilter.generateDefaultFilter = function() {return new CompoundFilter().addFilter(Filter.ExcludeExpiredNotesFilter).addFilter(Filter.DefaultPriorityFilter);};
    return {
        "Filter":Filter,
        "CompoundFilter":CompoundFilter,
        "IncludeExpiredNotesFilter" : Filter.IncludeExpiredNotesFilter,
        "ExcludeExpiredNotesFilter" : Filter.ExcludeExpiredNotesFilter,
        "DefaultPriorityFilter" : Filter.DefaultPriorityFilter,
        "generateDefaultFilter" : CompoundFilter.generateDefaultFilter,
        "createPriorityFilter" : Filter.createPriorityFilter
    };
});