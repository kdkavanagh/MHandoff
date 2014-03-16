define([
        'jquery',     
        'underscore', 
        'backbone',
        'bootstrap',
        'Collections/PatientCollection',
        'Views/DashboardTileView',
        ], function($, _, Backbone,Bootstrap, PatientCollection, DashboardTileView){

    var DashboardView = Backbone.View.extend({        

        initialize:function(options) {
            this.options = options || {};
            this.parent = this.options.parent;
            this.patients = new PatientCollection();
            this.listenTo(this.patients, 'reset', this.generateViews);
            this.patients.fetch({reset:true});
            this.tiles = new Array();
            this.gridsterObj = this.$el.find("#dashboardGrid > ul").gridster({
                autogenerate_stylesheet: false,
                widget_margins : [ 12, 12 ],
                widget_base_dimensions : [ 230, 130 ],
                min_cols : 3,
                max_cols : 3,
                autogrow_cols: true,
                namespace:"#dashboardGrid",
                resize: {
                    enabled: true,
                    max_size: [2, 2],
                    min_size: [1, 1]
                }
            }).data('gridster');
            this.gridsterObj.generate_stylesheet();


        },

        render : function() {
            //Render all the tiles
            for (var i = 0; i < this.tiles.length; i++) {
                this.tiles[i].render();
            }
            return this;
        },

        generateViews: function() {
            //Destroy existing views
            while (this.tiles.length > 0) {
                this.tiles.pop().destroy_full(null);
            }

            var row = 0;
            var self = this;
            this.patients.each(function(patient, index) { 
                col = index % 4;
                if(col == 0) {
                    row += 1;
                }
                self.createView(patient);
            });
            this.render();
        },

        createView: function(patient) {
            var tile = new DashboardTileView({patientModel : patient, gridster : this.gridsterObj});
            this.tiles.push(tile);
            var self = this;
            this.parent.listenTo(tile, 'patientOpenRequest', function(event) {
                if(event.$tabObject) {
                    //Weve already generated this view. just open the tab
                    event.$tabObject.tab('show');
                } else {
                    event.pullItems().then(function() {
                        console.log("Loaded");
                        self.parent.addPatientTab(event);
                    });
                }
            });

            return tile;

        },



    });


    return DashboardView;
});