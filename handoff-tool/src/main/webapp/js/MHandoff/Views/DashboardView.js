define([
        'jquery',     
        'underscore', 
        'backbone',
        'bootstrap',
        'isotope',
        'Collections/PatientCollection',
        'Views/DashboardTileView',
        ], function($, _, Backbone,Bootstrap,Isotope, PatientCollection, DashboardTileView){

    var DashboardView = Backbone.View.extend({        

        initialize:function(options) {
            this.options = options || {};
            this.parent = this.options.parent;
            this.patients = new PatientCollection();
            this.listenTo(this.patients, 'reset', this.generateViews);
            this.patients.fetch({reset:true});
            this.tiles = new Array();
            this.isotopeObj = this.$el.find("#dashboardGrid").isotope({
                
            }).data('isotope');

        },

        render : function() {
            //Render all the tiles
            for (var i = 0; i < this.tiles.length; i++) {
                this.tiles[i].render(this.isotopeObj);
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
            var tile = new DashboardTileView({patientModel : patient});
            this.tiles.push(tile);
            var self = this;
            this.parent.listenTo(tile, 'patientOpenRequest', function(event) {
                if(event.$tabObject) {
                    //Weve already generated this view. just open the tab
                    event.$tabObject.tab('show');
                } else {
                    event.pullItems().then(function() {
                        self.parent.addPatientTab(event);
                    });
                }
            });

            return tile;

        },



    });


    return DashboardView;
});