define([
        // These are path alias that we configured in our bootstrap
        'jquery',     
        'underscore', 
        'backbone',
        'bootstrap',
        'moment',
        'bootstrap_editable',
        'bootstrap_slider',
        'Models/PatientInfo',
        'require'

        ], function($, _, Backbone,Bootstrap,Moment, Bootstrap_editable, Bootstrap_slider, PatientInfo, require){

    //Returns a function that takes in the notemodel as an arg and returns a bool with whether or not the item is out-of-bounds
    var createPriorityFilter = function(sliderMin, sliderMax) {
        return function(noteModel) {
            return (noteModel.get("priorityCode") < sliderMin || noteModel.get("priorityCode") > sliderMax);
        };
    };

    var PatientInfoView = Backbone.View.extend({

        events:{        
            "click button#resetFilters":"resetFilters",
        },

        initialize : function (options) {
            console.log("Creating patientView for element "+this.$el.selector);
            this.render();
            this.on('change', this.render, this);


        },

        //Should trigger both 'filter' event and 'filtersReset' event
        resetFilters:function() {
            console.log("Resetting filters");
            this.$priorityFilterSlider.slider('setValue', [0,200]);
            this.trigger('filtersReset');
        },

        triggerFilter : function(filter) {
            this.trigger('filter', filter);
        },

        render:function() {
            this.$priorityFilterSlider = this.$el.find("#filterSlider");
            var sliderMin =0; sliderMax=200;
            var self = this;
            this.$priorityFilterSlider.slider({
                min : 0,
                max : 200,
                step : 50,
                value:[0,200],
                formater : function(first, second) {
                    var handoff = require("MHandoff");
                    if(first !== second) {
                        return handoff.priorityLevels[first] + ' to ' + handoff.priorityLevels[second];
                    } else {
                        return handoff.priorityLevels[first] +" only";
                    }
                },
            }).on('slide',  function(e){
                //only filter if we need to
                if(!(sliderMin === e.value[0] && sliderMax === e.value[1])) {
                    self.triggerFilter(createPriorityFilter( e.value[0], e.value[1]));
                    sliderMin = e.value[0];
                    sliderMax = e.value[1];
                }
            });

            return this;
        }

    });

    return PatientInfoView;
});