define([
        // These are path alias that we configured in our bootstrap
        'jquery',     
        'underscore', 
        'backbone',
        'bootstrap',
        'moment',
        'bootstrap_editable',
        'bootstrap_slider',
        'Models/Patient',
        'MHandoffCore',
        'Collections/filters'

        ], function($, _, Backbone,Bootstrap,Moment, Bootstrap_editable, Bootstrap_slider, Patient, MHandoffCore, Filter){

    var PatientInfoView = Backbone.View.extend({

        events:{        
            "click button#resetFilters":"resetFilters",
            "click label#nonExpiredNotes" : "nonExpiredNotes",
            "click label#allNotes" : "allNotes",
        },

        initialize : function (options) {
            this.render();
            this.on('change', this.render, this);
        },

        resetFilters:function() {
            console.log("Resetting filters");
            //Silently set the value of the priority slider
            this.sliderMax = 200;
            this.sliderMin = 0;
            this.$priorityFilterSlider.slider('setValue', [0,200], true);
            this.$nonExpiredNotes.button('toggle');
            this.trigger('filtersReset');
        },

        triggerFilter : function(filter) {
            this.trigger('filter', filter);
        },

        nonExpiredNotes : function() {
           this.triggerFilter( Filter.ExcludeExpiredNotesFilter);
        },

        allNotes : function() {
            this.triggerFilter( Filter.IncludeExpiredNotesFilter);
        },

        render:function() {
            this.$priorityFilterSlider = this.$el.find("#filterSlider");

            this.sliderMin =0; this.sliderMax=200;
            var self = this;
            this.$nonExpiredNotes=this.$el.find("#nonExpiredNotes");
            this.$nonExpiredNotes.tooltip({ container: 'body'});
            this.$priorityFilterSlider.slider({
                min : 0,
                max : 200,
                step : 50,
                value:[0,200],
                formater : function(first, second) {

                    if(first !== second) {
                        return MHandoffCore.priorityLevels[first] + ' to ' + MHandoffCore.priorityLevels[second];
                    } else {
                        return MHandoffCore.priorityLevels[first] +" only";
                    }
                },
            }).on('slide',  function(e){
                //only filter if we need to
                if(!(self.sliderMin === e.value[0] && self.sliderMax === e.value[1])) {
                    self.triggerFilter(Filter.createPriorityFilter( e.value[0], e.value[1]));
                    self.sliderMin = e.value[0];
                    self.sliderMax = e.value[1];
                }
            });

            return this;
        }

    });

    return PatientInfoView;
});