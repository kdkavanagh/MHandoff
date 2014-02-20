$(function() {

	var Note = Backbone.Model.extend({
		url:"",
		initialize: function(){
			alert("New Note model init");
		}
	});

	var noteCollection = Backbone.Collection.extend({
		model : Note,
		url : '/patient/items.do?type=note',
	});

	var theView = Backbone.View.extend({
		tagName: 'li',
		el: 'body',

		events: {
			'click #buttonPress': "render",
			'click #buttonPress': "addItem",
		},

		initialize: function () {

			console.log("Creating new view");
			_.bindAll(this, 'render');
			this.notes = new noteCollection();

			this.notes.on('reset', this.render, this);
			this.notes.on('change', this.render);
		},

		addItem: function() {
			console.log("Adding item");
			this.notes.fetch({ data: $.param({ patient: "kyle"}) 
				,reset:true});
			
		},

			render: function(){
				console.log("go for Loadme");
				var gridster = $(".gridster ul").gridster().data('gridster');
				var row = 0;
				this.notes.each(function(note, index) { // iterate through the collection
					console.log("Adding "+note.get("noteId"));
					col = index % 4;
					if(col == 0) {
						row += 1;
					}
					 gridster.add_widget("<li data-row=\""+row+"\" data-col=\""+col+"\" data-sizex=\"1\" data-sizey=\"1\">"+note.get("text")+"</li>");
					console.log("Adding item to grid at "+row+","+col);
//					$("#notesList").append("<li data-row=\""+row+"\" data-col=\""+col+"\" data-sizex=\"1\" data-sizey=\"1\">"+note.get("text")+"</li>"
//							);
				});

				return this;
			}
		});

			var view = new theView();

	});
