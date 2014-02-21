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
		tagName: 'li',
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
			this.noteModel.on('remove', this.destroy_view);
		},

		render: function(){
			var tmpl = _.template(this.template); //tmpl is a function that takes a JSON and returns html

			this.setElement(tmpl(this.noteModel.toJSON()));
			//console.log(this.el);
			this.gridster.add_widget(this.el);
			//console.log(this.$el.children);
		},

		buttonClickHandler : function(event){
			console.log("Removing...");
			this.noteModel.destroy();
			this.gridster.remove_widget(this.$el);
			this.remove();

			return false;
		},
		
		remove: function() {
			Backbone.View.prototype.remove.apply(this, arguments);
			this.trigger('remove', this);
			return this;
		},

		destroy_full: function(event) {
			console.log("Destorying item");
			this.unbind(); // Unbind all local event bindings
			this.noteModel.unbind( 'change', this.render, this ); // Unbind reference to the model
			this.options.parent.unbind( 'close:all', this.close, this ); // Unbind reference to the parent view

			this.remove(); // Remove view from DOM

			delete this.$el; // Delete the jQuery wrapped object variable
			delete this.el; // Delete the variable reference to this node

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
			var self = this;
			this.notes.each(function(note, index) { 
				col = index % 4;
				if(col == 0) {
					row += 1;
				}
				var noteView = new IndividualNoteView({el:$("#"+note.get("noteId")), noteModel:note, row:row, col:col, gridster : gridsterObj});
				self.noteViews.push(noteView);
				noteView.on('remove', self.noteRemoved, self);
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
		
		noteRemoved:function(event) {
			console.log("here");
			console.log(this);
			var index = this.noteViews.indexOf(event);
			if (index > -1) {
			    this.noteViews.splice(index, 1);
			}
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
