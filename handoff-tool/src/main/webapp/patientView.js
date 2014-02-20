$(function() {

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
	tagName: 'li',
	el: 'body',

	events: {
		'click #buttonPress': "render",
	},

	initialize: function () {

		console.log("Creating new view");
		_.bindAll(this, 'render');
		this.collection = new noteCollection();
		this.collection.fetch({reset:true});
		this.collection.on('reset', this.render, this);
		this.render();
		console.log("Done rendering");
	},

	render: function(){
		console.log("go for Loadme");

		this.collection.each(function(patient) { // iterate through the collection
			console.log(patient.get("name"));
			$("#patientList").append("<li>"+patient.get("name")+"</li>");
		});

		return this;
	}
});

var view = new theView();

});
