$(function() {

	var Note = Backbone.Model.extend({
		url:"",
		initialize: function(){
			alert("New Note model init");
		},
	
		toListItem: function(row, col) {
			var str ="<li data-row=\""+row+"\" data-col=\""+col+"\" data-sizex=\"1\" data-sizey=\"1\">";
			str += "Text: ";
			str+= this.get("text");
			str += "</li>";
			return str;
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
			'click #buttonPress': "getItems",
			'click #addDummyButton': "addItem",
		},

		initialize: function () {

			console.log("Creating new view");
			_.bindAll(this, 'render');
			this.notes = new noteCollection();

			this.notes.on('reset', this.render, this);
			this.notes.on('change', this.render);
			this.notes.on('add', this.render);
		},

		getItems: function() {
			console.log("Getting all items");
			this.notes.fetch({ data: $.param({ patient: "kyle",}) 
				,reset:true,});
			
		},
		addItem: function() {
			console.log("Adding item");
			 var note = new Note({text:"My dummy note",});
			 this.notes.add(note);
		},

			render: function(){
				console.log("go for Loadme");
				var ele = $("#noteGrid ul");
				var gridster = ele.gridster().data('gridster');
				gridster.remove_all_widgets();
				var row = 0;
				this.notes.each(function(note, index) { 
					col = index % 4;
					if(col == 0) {
						row += 1;
					}
					//console.log("Adding item to grid at "+row+","+col);
					gridster.add_widget(note.toListItem(row,col));
				});

				return this;
			}
		});

			var view = new theView();

	});
