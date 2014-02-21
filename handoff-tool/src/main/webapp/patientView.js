$(function() {

	var Note = Backbone.Model.extend({
		url:"",
		defaults : {
			noteId : "0",
			priority :"1",
			reporter:"N/A",
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
		},

		render: function(){
			var tmpl = _.template(this.template); //tmpl is a function that takes a JSON and returns html
			this.setElement(tmpl(this.noteModel.toJSON()));
			this.check();
			this.gridster.add_widget(this.el);
		},

		check: function() {
			var checker = new checkLength();
			checker.check();
			var moreThis = this.$el.find('.more');
			moreThis.on('click', function (e) {
				moreThis.closest('.noteTextArea').toggleClass('active');
				checker.check();
			});


			$(window).resize(function() {
				checker.check()
			});
		},

		buttonClickHandler : function(event){
			console.log("Removing...");
			//this.noteModel.destroy();
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
			console.log("Destroying item");
			this.unbind(); // Unbind all local event bindings
			this.noteModel.unbind( 'change', this.render, this ); // Unbind reference to the model
			this.noteModel.destroy();
			this.options.parent.unbind( 'close:all', this.close, this ); // Unbind reference to the parent view

			this.remove(); // Remove view from DOM

			delete this.$el; // Delete the jQuery wrapped object variable
			delete this.el; // Delete the variable reference to this node

		}
	});

	var NoteGridView = Backbone.View.extend({

		el: '.base',
		mostRecentlyDeletedView : null,

		events: {
			'click #buttonPress': "getItems",
			'click #addDummyButton': "addItem",
			'click #undoButton' : "undoRemove",
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
			this.noteViews = new Array();
			this.garbageViews = new Array();
		},

		createView: function(note, row, col, self) {
			var gridsterObj = $("#noteGrid ul").gridster().data('gridster');
			var noteView = new IndividualNoteView({parent : self, noteModel:note, row:row, col:col, gridster : gridsterObj});
			self.noteViews.push(noteView);
			noteView.on('remove', self.noteRemoved, self);

		},

		generateViews: function() {
			//Destroy existing views
			while (this.noteViews.length > 0) {
				this.garbageViews.push(this.noteViews.pop());
			}

			var row = 0;
			var self = this;
			this.notes.each(function(note, index) { 
				col = index % 4;
				if(col == 0) {
					row += 1;
				}
				self.createView(note, row, col, self);
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
			this.createView(note, 0, 0, this);
			this.notes.add(note);
		},


		undoRemove:function() {
			if(this.mostRecentlyDeletedView != null) {
				this.noteViews.push(this.mostRecentlyDeletedView);
				this.mostRecentlyDeletedView.render();
				this.mostRecentlyDeletedView = null;
			}
		},

		noteRemoved:function(event) {
			if(this.mostRecentlyDeletedView != null) {
				//There was a previously deleted note, lets get rid of it for good
				console.log("Permanently deleting note");
				this.mostRecentlyDeletedView.destroy_full(null);
			}
			//remove the view from our list of views to render
			var index = this.noteViews.indexOf(event);
			if (index > -1) {
				this.noteViews.splice(index, 1);
			}
			this.mostRecentlyDeletedView = event;
		},

		render: function(){
			console.log("Rendering now");
			var gridsterObj = $("#noteGrid ul").gridster().data('gridster');
			gridsterObj.remove_all_widgets();

			for (var i = 0; i < this.noteViews.length; i++) {
				this.noteViews[i].render();
			}

			//delete any garbage we have (must be done after remove_all_widgets()
			while(this.garbageViews.length > 0) {
				this.garbageViews.pop().destroy_full(null);
			}

			return this;
		}
	});


	function checkLength() {
		this.showing = new Array();
	}

	checkLength.prototype.check = function() {
		//Check to see if we need the "more" text
		var that = this;
		$('.noteTextArea').each(function (index) {
			var article = $(this);
			var theP = article.find('p');
			var theMore = article.find('.more');
			 if(theP[0].scrollHeight >= $(this).height()) {
				theMore.show();
				that.showing[index] = true;
			} else {
				if (!article.hasClass('active')) {
					theMore.hide();
					that.showing[index] = false;
				} else {
					that.showing[index] = false;
				}
			}
			theMore.text(that.showing[index] ? "More..." : "Less...");
		});
	};



	var view = new NoteGridView();

});
