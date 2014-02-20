$(function() {

	var Note = Backbone.Model.extend({
		url:"",
		defaults : {
			noteId : "0",
		},
		initialize: function(){
			alert("New Note model init");
		},
	});

	var NoteCollection = Backbone.Collection.extend({
		model : Note,
		url : '/patient/items.do?type=note',
	});

	var IndividualNoteView = Backbone.View.extend({

		template:$("#indivNoteTemplate").html(),
		
		events: {
			'click .removeItem': "buttonClickHandler",
		},

		initialize : function (options) {
			console.log("Creating new indiv note view");
			
			this.options = options || {};
			this.gridster = this.options.gridster;
			this.noteModel = this.options.noteModel;
			this.row = this.options.row;
			this.col = this.options.col;
			this.el = $("#"+this.noteModel.get("noteId"));
			console.log("my domain- "+this.el.selector);
			this.noteModel.on('remove', this.destroy_view);
		},

		render: function(){
			var tmpl = _.template(this.template); //tmpl is a function that takes a JSON and returns html
			 
	        //this.$el.html();
			//this.el = tmpl(this.noteModel.toJSON());
			this.gridster.add_widget(tmpl(this.noteModel.toJSON()));
		},

		buttonClickHandler : function(event){
			alert( $(event.currentTarget).text());

			return false;
		},

		destroy_view: function(event) {
			console.log("Destorying item");
			//COMPLETELY UNBIND THE VIEW
			this.undelegateEvents();

			this.$el.removeData().unbind(); 

			//Remove view from DOM
			this.remove();  
			Backbone.View.prototype.remove.call(this);

		}
	});

	var theView = Backbone.View.extend({

		el: '.base',


		events: {
			'click #buttonPress': "getItems",
			'click #addDummyButton': "addItem",
			'click #removeButton': "removeLast",
		},

		initialize: function () {

			console.log("Creating new view");
			_.bindAll(this, 'render');

			this.notes = new NoteCollection();
			this.notes.fetch({ data: $.param({ patient: "kyle",}) 
				,reset:true,});


			this.notes.on('reset', this.generateViews, this);
			this.notes.on('change', this.render);
			this.notes.on('add', this.render);


		},

		generateViews: function() {
			var row = 0;
			this.noteViews = new Array();
			var gridsterObj = $("#noteGrid ul").gridster().data('gridster');
			var thisHelper = this;
			this.notes.each(function(note, index) { 
				col = index % 4;
				if(col == 0) {
					row += 1;
				}
				var noteView = new IndividualNoteView({noteModel:note, row:row, col:col, gridster : gridsterObj});
				thisHelper.noteViews.push(noteView);
			});
			this.render();
		},

		getItems: function() {
			console.log("Getting all items");
			this.notes.fetch({ data: $.param({ patient: "kyle",}) 
				,reset:true,});

		},
		addItem: function() {
			console.log("Adding item");
			//create the note
			var note = new Note({text:"My dummy note",});
			var gridsterObj = $("#noteGrid ul").gridster().data('gridster');
			var noteView = new IndividualNoteView({noteModel:note, row:0, col:0, gridster : gridsterObj});
			this.noteViews.push(noteView);
			this.notes.add(note);
		},


		removeLast: function() {
			console.log("Remove last length="+this.notes.length);
			this.notes.remove(this.notes.at(this.notes.length-1));
		},

		render: function(){
			console.log("Rendering now");
			var gridsterObj = $("#noteGrid ul").gridster().data('gridster');
			gridsterObj.remove_all_widgets();
			
			for (var i = 0; i < this.noteViews.length; i++) {
				this.noteViews[i].render();
			}

			return this;
		}
	});

	var view = new theView();

});
