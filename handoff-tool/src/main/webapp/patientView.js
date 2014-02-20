

var Patient = Backbone.Model.extend({
	initialize: function(){
		alert("New patient model init");
	}
});

var noteCollection = Backbone.Collection.extend({
	model : Patient,
	url : 'https://localhost:8443/patient/items.do?patient=kyle&type=note',
	fetch : function() {
		$.ajax({
			type : 'GET',
			url : this.url,
			success : function(data) {
				console.log(data);
			}
		});
	}
});

var theView = Backbone.View.extend({
	el: $("test"),

	events: {
		'click button#add': "loadMe",
	},

	initialize: function () {
		
		console.log("Creating new view");
		  _.bindAll(this, 'render', 'loadMe');
		this.collection = new noteCollection();
		this.collection.fetch({reset:true});
		this.collection.on('reset', this.render, this);
		this.render();
		console.log("Done rendering")
	},

	render: function(){
		$(this.el).append("<button id='add'>Add list item</button>");
		$(this.el).append("<ul></ul>");
	},

	loadMe : function () {
		console.log("go for Loadme")
		
		this.collection.each(function(patient) { // iterate through the collection
			console.log(patient.get("name"));
			$('ul', this.el).append("<li>"+patient.get("name")+"</li>")
		});

		return this;
	}
});

var view = new theView({ el: $('#myButtons') });