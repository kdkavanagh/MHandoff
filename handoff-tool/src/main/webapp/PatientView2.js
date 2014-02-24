$(function() {
	/*
	var PatientModel = Backbone.Model.extend({
		urlRoot: '/patientInfo.do?',

	})

	//this is testing purposes.
	//TODO: need to pull all patient list and disply one at a time.
	var patient = PatientModel({id:1});

	user.fetch({
		success: function (patient) {
			alert(user.toJSON());
		}

	})

	*/
	var PatientView = Backbone.View.extend({
		el: $('body'),
		/*
		events: {
			'click button#add': 'testItem'
		},

		*/
		initialize: function(){
			_.bindAll(this, 'render');

			this.render();
		},

		render: function(){
			//var self = this;
			$(this.el).append("Testing");


		}

	});

	var patientView = new patientView();


});